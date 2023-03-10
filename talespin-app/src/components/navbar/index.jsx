import FeatherIcon from "feather-icons-react/build/FeatherIcon";

export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FeatherIcon icon={"feather"} size={32}></FeatherIcon>
                        <h1 className="ml-4">TaleSpin</h1>
                    </div>
                    <a href="/">Home</a>
                </div>
            </nav>
        </>
    );
}
