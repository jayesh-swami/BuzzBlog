import React from 'react'

function Footer() {
    return (
        <footer className="text-cream p-2 text-center fixed-bottom">
            Copyright &copy; {new Date().getFullYear()} GossBlog
        </footer>
    )
}

export default Footer;
