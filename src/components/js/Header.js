import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className = 'header'>
            <h1>
                <Link to="/">리스트 링크</Link>
            </h1>
            <div className='menu'>
                <Link to="/create_word" className="link">
                    add
                </Link>
                <Link to="/create_day" className="link">
                    day add
                </Link>
            </div>
        </div>
    )
}