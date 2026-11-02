export default function Header() {
  return (
    <header>
      <a className="logo" href="#">
        SOFT<span>GLOW</span>.
      </a>
      <nav>
        <a href="#about">ABOUT</a>
        <a href="#works">WORKS</a>
        <a href="#collection">COLLECTION</a>
        <a href="#contact">CONTACT</a>
      </nav>
      <button className="menu" aria-label="메뉴">
        ☰
      </button>
    </header>
  )
}
