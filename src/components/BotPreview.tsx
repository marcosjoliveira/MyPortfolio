import './BotPreview.css'

const SOURCES = ['Amazon', 'Mercado Livre', 'Shopee']
const CHANNELS = ['Telegram', 'WhatsApp']

/** Prévia do Bot de Promoções desenhada em código: o caminho da oferta
 *  (lojas → bot → canais) ao lado de uma mensagem como a que o bot publica. */
export default function BotPreview() {
  return (
    <div className="botPreview" role="img" aria-label="Fluxo do bot: ofertas das lojas viram mensagens publicadas no Telegram e no WhatsApp">
      <div className="botPreview__flow" aria-hidden="true">
        <span className="botPreview__caption">Lojas monitoradas</span>
        <ul className="botPreview__nodes">
          {SOURCES.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <span className="botPreview__wire" />

        <div className="botPreview__core">
          <span className="botPreview__pulse" />
          Bot · scraping + filtro de ofertas
        </div>

        <span className="botPreview__wire" />

        <span className="botPreview__caption">Publica em</span>
        <ul className="botPreview__nodes botPreview__nodes--out">
          {CHANNELS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="botPreview__chat" aria-hidden="true">
        <div className="botPreview__chatHead">
          <img src="/projects/bot-avatar.webp" alt="" width={32} height={32} loading="lazy" />
          <div>
            <strong>Promoções do Marcos</strong>
            <span>canal</span>
          </div>
        </div>

        <div className="botPreview__bubble">
          <div className="botPreview__product">
            <img src="/projects/bot-oferta.webp" alt="" loading="lazy" />
          </div>
          <p className="botPreview__headline">Caiu agora na Amazon</p>
          <p className="botPreview__item">Azzaro The Most Wanted Intense, perfume masculino</p>
          <div className="botPreview__price">
            <s>R$ 679,00</s>
            <strong>R$ 399,99</strong>
            <em>41% OFF</em>
          </div>
          <span className="botPreview__buy">Compre agora ↗</span>
          <span className="botPreview__time">17:13</span>
        </div>
      </div>
    </div>
  )
}
