/**
 * Space Cloud Division — Data Pipes
 * Routing between Solar_Uplink and Reno_Downlink.
 * EGS Pipe · Vibelandia · Reno anchor.
 */

export type PipeDirection = 'Solar_Uplink' | 'Reno_Downlink';

export interface PipeRoute {
  from: PipeDirection;
  to: PipeDirection;
  active: boolean;
  last_activity_utc?: string;
}

export interface PipeState {
  solar_uplink_active: boolean;
  reno_downlink_active: boolean;
  mode: string;
  route: PipeRoute | null;
}

const DEFAULT_MODE = 'SPACE_CLOUD_ACTIVE';

/**
 * Route a packet from Solar Uplink (Sun/AR4366) toward Reno Downlink.
 */
export function routeSolarToReno(state: Partial<PipeState> = {}): PipeRoute {
  return {
    from: 'Solar_Uplink',
    to: 'Reno_Downlink',
    active: state.solar_uplink_active ?? true,
    last_activity_utc: new Date().toISOString(),
  };
}

/**
 * Route a packet from Reno Downlink back toward Solar Uplink (e.g. handshake).
 */
export function routeRenoToSolar(state: Partial<PipeState> = {}): PipeRoute {
  return {
    from: 'Reno_Downlink',
    to: 'Solar_Uplink',
    active: state.reno_downlink_active ?? true,
    last_activity_utc: new Date().toISOString(),
  };
}

/**
 * Get current pipe state for telemetry; mode defaults to SPACE_CLOUD_ACTIVE.
 */
export function getPipeState(overrides: Partial<PipeState> = {}): PipeState {
  return {
    solar_uplink_active: true,
    reno_downlink_active: true,
    mode: overrides.mode ?? DEFAULT_MODE,
    route: overrides.route ?? routeSolarToReno(),
    ...overrides,
  };
}
