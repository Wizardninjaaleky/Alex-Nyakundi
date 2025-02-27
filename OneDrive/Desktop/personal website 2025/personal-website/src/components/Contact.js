import React from 'react';

const Contact = (+254792008864) => {
    return (
        <div>
            <h2>Contact Me</h2>
            <form>
                <input type="email" placeholder="alexnyakundi56@gmail.com" required />
                <textarea placeholder="Your Message" required></textarea>
                <button type="submit">Send</button>
            </form>
            <button>Request a Quote</button>
            <button>Call Me</button>
        </div>
    );
};

export default Contact;
