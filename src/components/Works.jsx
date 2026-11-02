import { useState } from 'react'
import videos from '../data/works.json'

export default function Works() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  if (videos.length === 0) return null

  const go = (dir) => {
    setPlaying(false)
    setIndex((i) => (i + dir + videos.length) % videos.length)
  }

  const goTo = (i) => {
    if (i === index) return
    setPlaying(false)
    setIndex(i)
  }

  const current = videos[index]

  return (
    <section id="works">
      <div className="section-head">
        <div className="kicker">02 — WORKS</div>
        <h2>Moments in motion.</h2>
        <div className="sub">로나의 영상 작업들을 한 장면씩 만나보세요.</div>
      </div>
      <div className="works-slider">
        <button className="slide-arrow prev" aria-label="이전 영상" onClick={() => go(-1)}>
          ‹
        </button>
        <div className="slide-frame">
          {playing ? (
            <iframe
              key={current.id}
              className="slide-video"
              src={`https://www.youtube.com/embed/${current.id}?autoplay=1&rel=0&modestbranding=1`}
              title={current.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img
                className="slide-video"
                src={`https://i.ytimg.com/vi/${current.id}/hqdefault.jpg`}
                alt={current.title}
                loading="lazy"
              />
              <button className="play-overlay" onClick={() => setPlaying(true)} aria-label="재생">
                ▶
              </button>
              <div className="slide-caption">
                <h3>{current.title}</h3>
              </div>
            </>
          )}
        </div>
        <button className="slide-arrow next" aria-label="다음 영상" onClick={() => go(1)}>
          ›
        </button>
      </div>
      <div className="slide-dots">
        {videos.map((v, i) => (
          <button
            key={v.id}
            className={`dot${i === index ? ' active' : ''}`}
            aria-label={`${v.title} 보기`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  )
}
