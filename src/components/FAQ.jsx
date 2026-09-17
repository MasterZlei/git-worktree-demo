import { useState } from 'react';
import { FAQ as FAQ_DATA } from '../data/faq';

function ChevronIcon({ open }) {
    return (
        <svg
            className={`faq__chevron ${open ? 'faq__chevron--open' : ''}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function FAQ() {
    const [openIds, setOpenIds] = useState(() => new Set());

    const toggleItem = (id) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <section className="faq" id="faq" aria-labelledby="faq-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">{FAQ_DATA.badge}</span>
                    <h2 id="faq-title" className="section-header__title">
                        {FAQ_DATA.title}
                    </h2>
                    <p className="section-header__desc">{FAQ_DATA.subtitle}</p>
                </div>

                <div className="faq__list" role="list">
                    {FAQ_DATA.items.map((item) => {
                        const isOpen = openIds.has(item.id);
                        const panelId = `faq-panel-${item.id}`;
                        const buttonId = `faq-button-${item.id}`;

                        return (
                            <div
                                key={item.id}
                                className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
                                role="listitem"
                            >
                                <h3 className="faq__question">
                                    <button
                                        id={buttonId}
                                        type="button"
                                        className="faq__trigger"
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        onClick={() => toggleItem(item.id)}
                                    >
                                        <span className="faq__question-text">{item.question}</span>
                                        <ChevronIcon open={isOpen} />
                                    </button>
                                </h3>
                                <div
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={buttonId}
                                    className="faq__panel"
                                    hidden={!isOpen}
                                >
                                    <p className="faq__answer">{item.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FAQ;
