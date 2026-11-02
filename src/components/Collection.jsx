const cards = [
  { num: '01', title: 'Pastel mood', desc: 'test.' },
  {
    num: '02',
    title: 'Pink daydream',
    desc: '중앙에 피어나는 소프트 핑크의 은은한 그라데이션.',
  },
  {
    num: '03',
    title: 'Aqua sparkle',
    desc: '투명한 아쿠아 블루로 더하는 작은 반짝임.',
  },
]

export default function Collection() {
  return (
    <section id="collection">
      <div className="section-head">
        <div className="kicker">03 — DISCOVER</div>
        <h2>Made of little wonders.</h2>
        <div className="sub">마우스를 올려 카드의 부드러운 움직임을 느껴보세요.</div>
      </div>
      <div className="cards">
        {cards.map((card) => (
          <article className="card" key={card.num}>
            <div className="num">{card.num}</div>
            <div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
            <div className="arrow">↗</div>
          </article>
        ))}
      </div>
    </section>
  )
}
