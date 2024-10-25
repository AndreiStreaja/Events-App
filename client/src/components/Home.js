import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    return (
        <div className="container mt-5">
            <header className="text-center mb-5">
                <h1 className="display-3 text-primary font-weight-bold">Bun venit!</h1>
                <nav>
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <a className="btn btn-lg btn-primary mx-2 shadow-sm" href="/events">
                                <i className="fas fa-calendar-alt"></i> Evenimente
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-lg btn-outline-secondary mx-2 shadow-sm" href="/profile">
                                <i className="fas fa-user-circle"></i> Profilul Meu
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-lg btn-outline-info mx-2 shadow-sm" href="/rezervations">
                                <i className="fas fa-ticket-alt"></i> Rezervările Mele
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-lg btn-danger mx-2 shadow-sm" href="/">
                                <i className="fas fa-sign-out-alt"></i> Deconectare
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>

            <footer className="text-center mt-5">
                <p className="text-muted">&copy; {new Date().getFullYear()} Compania Ta. Toate drepturile rezervate.</p>
                <p>
                    <a href="/terms" className="text-muted">Termeni și condiții</a> | 
                    <a href="/privacy" className="text-muted"> Politica de confidențialitate</a>
                </p>
            </footer>
        </div>
    );
};

export default HomePage;
