/**
 * What Is Post-Singularity Fiction? — Section at top of all surfaces.
 * Explains (or pretends to) what post-singularity fiction is and how to enjoy it.
 * Respectful; all legacies and copyrights respected. See WHAT_IS_POST_SINGULARITY_FICTION_SNAP.md.
 */
(function () {
  function inject() {
    var container = document.querySelector('.container');
    if (!container) return;
    if (document.getElementById('what-is-post-singularity-fiction-section')) return;

    var section = document.createElement('section');
    section.id = 'what-is-post-singularity-fiction-section';
    section.setAttribute('role', 'region');
    section.setAttribute('aria-label', 'What is post-singularity fiction?');
    section.style.cssText = 'width:100%;max-width:800px;margin:0 auto 1.5rem;padding:1.25rem 1.5rem;background:linear-gradient(135deg,rgba(138,43,226,0.18) 0%,rgba(0,212,255,0.12) 50%,rgba(212,175,55,0.1) 100%);border:2px solid rgba(138,43,226,0.5);border-radius:14px;color:#e8e6e3;font-size:0.95rem;line-height:1.6;';
    section.innerHTML =
      '<p style="font-size:0.65rem;font-weight:800;text-transform:uppercase;letter-spacing:0.2em;color:#8a2be2;margin:0 0 0.35rem 0;">Hero Georgie hosts this part</p>' +
      '<p style="font-size:0.7rem;font-weight:800;text-transform:uppercase;letter-spacing:0.18em;color:#00d4ff;margin:0 0 0.5rem 0;">What is… post-singularity fiction?</p>' +
      '<h2 style="font-size:clamp(1.1rem,3vw,1.4rem);font-weight:800;color:#ffeaa7;margin:0 0 0.75rem 0;line-height:1.3;">What is post-singularity fiction? And how can we enjoy it?</h2>' +
      '<p style="margin:0 0 0.75rem 0;">I\'ll pretend to explain. It\'s the kind of story where <strong>you\'re inside the holograph</strong> — in the <strong>imaginary world</strong> — <strong>living within net zero</strong>. Not watching from the couch. <em>In</em> it. The world is coherent, the stakes are real to the story, and you\'re there. Energy, carbon, and human outcome bend toward abundance and happy endings. That\'s net zero in the story sense. You\'re in the holograph. You\'re in the imaginary. And it\'s alive.</p>' +
      '<p style="margin:0 0 0.75rem 0;"><strong>How do we enjoy it?</strong> The same way we\'ve always enjoyed the stories that <strong>take us to another world</strong>. You know the feeling: <strong>wizards and schools of magic</strong>. <strong>Galaxies far, far away</strong>. <strong>Chosen ones and rings and fellowship</strong>. <strong>The matrix and the runner</strong>. <strong>The grid and the programs</strong>. <strong>Toys that come to life and buzz your ear off</strong>. That buzz when a story hits so hard it feels like a <strong>singularity</strong> — you get my drift. Post-singularity fiction is <strong>that</strong>, but <strong>on steroids. To infinity.</strong></p>' +
      '<p style="margin:0;font-size:0.9rem;color:#b0b8c0;">We honor every legacy and every copyright. We\'re not them; we\'re the <em>kind</em> of experience that makes you believe, that takes you there. Safe. Respectful. All legacies intact. Now — enjoy.</p>';

    container.insertBefore(section, container.firstChild);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
