const ChatHeader = ({
    contactName,
    contactStatus,
    profilePic,
    onBack,
    onHeaderClick
}) => {
    return (
        <div className="chat-header">
            <button
                className="back-button chat-header-back-button"
                onClick={onBack}
                aria-label="Volver"
            >
                ←
            </button>

            <div
                className="chat-header-info"
                onClick={onHeaderClick}
            >
                {profilePic && (
                    <img
                        src={profilePic}
                        alt={contactName}
                        className="chat-header-avatar"
                    />
                )}

                <div className="chat-header-text">
                    <h2 className="chat-header-name">{contactName}</h2>
                    <span className="chat-header-status">{contactStatus}</span>
                </div>
            </div>

            <button
                className="chat-header-menu-button"
                onClick={onHeaderClick}
                aria-label="Opciones de contacto"
            >
                ⋮
            </button>
        </div>
    );
};

export default ChatHeader;
