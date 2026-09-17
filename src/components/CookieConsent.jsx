import { useState } from 'react';
import {
    COOKIE_CONTENT,
    COOKIE_PREFERENCE,
    COOKIE_STORAGE_KEY,
} from '../data/cookie';

function readStoredPreference() {
    try {
        return localStorage.getItem(COOKIE_STORAGE_KEY);
    } catch {
        return null;
    }
}

function CookieConsent() {
    const [visible, setVisible] = useState(() => !readStoredPreference());

    function persistPreference(value) {
        try {
            localStorage.setItem(COOKIE_STORAGE_KEY, value);
        } catch {
            // ignore quota / private-mode failures
        }
        setVisible(false);
    }

    function handleAccept() {
        persistPreference(COOKIE_PREFERENCE.ACCEPTED);
    }

    function handleReject() {
        persistPreference(COOKIE_PREFERENCE.REJECTED);
    }

    if (!visible) {
        return null;
    }

    return (
        <aside
            className="cookie-consent"
            role="region"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-desc"
            aria-live="polite"
        >
            <div className="cookie-consent__inner">
                <div className="cookie-consent__text">
                    <p id="cookie-consent-title" className="cookie-consent__title">
                        {COOKIE_CONTENT.title}
                    </p>
                    <p id="cookie-consent-desc" className="cookie-consent__desc">
                        {COOKIE_CONTENT.description}{' '}
                        <a href={COOKIE_CONTENT.privacyLink.href} className="cookie-consent__link">
                            {COOKIE_CONTENT.privacyLink.label}
                        </a>
                    </p>
                </div>
                <div className="cookie-consent__actions">
                    <button
                        type="button"
                        className="btn btn--outline btn--sm"
                        onClick={handleReject}
                    >
                        {COOKIE_CONTENT.rejectLabel}
                    </button>
                    <button
                        type="button"
                        className="btn btn--primary btn--sm"
                        onClick={handleAccept}
                    >
                        {COOKIE_CONTENT.acceptLabel}
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default CookieConsent;
