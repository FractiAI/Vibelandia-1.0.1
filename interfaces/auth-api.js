/**
 * Auth API — Octave 2 only (fetch). No Supabase client.
 * Session, login, signup, logout, Google OAuth redirect.
 * Token stored in localStorage; send Authorization: Bearer on requests.
 */
(function () {
  var BASE = typeof window !== 'undefined' && window.VIBELANDIA_API_BASE
    ? window.VIBELANDIA_API_BASE
    : 'https://syntheverse-poc.vercel.app';
  var TOKEN_KEY = 'vibelandia_auth_token';
  var USER_KEY = 'vibelandia_auth_user';

  function getToken() {
    try {
      return localStorage.getItem(TOKEN_KEY) || undefined;
    } catch (_) { return undefined; }
  }

  function setToken(token, user) {
    try {
      if (token) localStorage.setItem(TOKEN_KEY, token);
      else localStorage.removeItem(TOKEN_KEY);
      if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
      else localStorage.removeItem(USER_KEY);
    } catch (_) {}
  }

  function authHeaders() {
    var t = getToken();
    var h = { 'Content-Type': 'application/json' };
    if (t) h['Authorization'] = 'Bearer ' + t;
    return h;
  }

  function api(path, options) {
    var url = BASE + (path.charAt(0) === '/' ? path : '/' + path);
    var opts = options || {};
    var headers = opts.headers || authHeaders();
    return fetch(url, {
      method: opts.method || 'GET',
      headers: headers,
      body: opts.body != null ? (typeof opts.body === 'string' ? opts.body : JSON.stringify(opts.body)) : undefined,
      credentials: opts.credentials || 'same-origin'
    });
  }

  /**
   * GET /api/auth/session — current user or null.
   * @returns {Promise<{user: object}|null>}
   */
  function getSession() {
    return api('/api/auth/session', { method: 'GET' })
      .then(function (r) {
        if (r.status === 401) { setToken(null, null); return null; }
        if (!r.ok) return null;
        return r.json();
      })
      .then(function (data) {
        if (data && data.user) setToken(getToken(), data.user);
        return data;
      })
      .catch(function () { return null; });
  }

  /**
   * POST /api/auth/login — returns { token, user }. Stores token.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token: string, user: object}|null>}
   */
  function login(email, password) {
    return api('/api/auth/login', {
      method: 'POST',
      body: { email: email, password: password }
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (data && data.token && data.user) {
        setToken(data.token, data.user);
        return data;
      }
      return null;
    }).catch(function () { return null; });
  }

  /**
   * POST /api/auth/signup — same shape as login.
   */
  function signup(email, password) {
    return api('/api/auth/signup', {
      method: 'POST',
      body: { email: email, password: password }
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (data && data.token && data.user) {
        setToken(data.token, data.user);
        return data;
      }
      return null;
    }).catch(function () { return null; });
  }

  /**
   * POST /api/auth/logout — clear token server-side, then localStorage.
   */
  function logout() {
    return api('/api/auth/logout', { method: 'POST' })
      .catch(function () {})
      .then(function () { setToken(null, null); });
  }

  /**
   * Google OAuth: redirect to Octave 2. Return URL should include current page (e.g. checkout?plan=...).
   * @param {string} returnUrl — full URL to return to after OAuth (hash #token=... will be appended).
   */
  function getGoogleAuthUrl(returnUrl) {
    return BASE + '/api/auth/google?redirect_uri=' + encodeURIComponent(returnUrl || (typeof window !== 'undefined' && window.location ? window.location.href : ''));
  }

  /**
   * Check URL for #token=... or ?token=... (OAuth callback). If present, store and return token.
   * @returns {string|undefined}
   */
  function consumeOAuthToken() {
    if (typeof window === 'undefined' || !window.location) return undefined;
    var h = window.location.hash || '';
    var q = window.location.search || '';
    var match = (h + '&' + q).match(/[#&]token=([^&]+)/);
    if (!match) return undefined;
    var token = decodeURIComponent(match[1]);
    var user = { id: '', email: '', displayName: null };
    setToken(token, user);
    try {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (_) {}
    return token;
  }

  /**
   * Stored user (from localStorage). Use after getSession or login/signup.
   */
  function getStoredUser() {
    try {
      var s = localStorage.getItem(USER_KEY);
      return s ? JSON.parse(s) : null;
    } catch (_) { return null; }
  }

  /**
   * GET /api/user/profile — { user, wallet }. Auth required.
   */
  function getProfile() {
    return api('/api/user/profile', { method: 'GET' })
      .then(function (r) {
        if (r.status === 401) return null;
        if (!r.ok) return null;
        return r.json();
      })
      .catch(function () { return null; });
  }

  /**
   * POST /api/orders/complete — after PayPal capture. Returns { goldenKey, orderId, planId }.
   */
  function completeOrder(orderId, planId) {
    return api('/api/orders/complete', {
      method: 'POST',
      body: { orderId: orderId, planId: planId }
    }).then(function (r) {
      if (!r.ok) return null;
      return r.json();
    }).catch(function () { return null; });
  }

  window.VibelandiaAuth = {
    getApiBase: function () { return BASE; },
    getToken: getToken,
    authHeaders: authHeaders,
    getSession: getSession,
    login: login,
    signup: signup,
    logout: logout,
    getGoogleAuthUrl: getGoogleAuthUrl,
    consumeOAuthToken: consumeOAuthToken,
    getStoredUser: getStoredUser,
    getProfile: getProfile,
    completeOrder: completeOrder,
    api: api
  };
})();
