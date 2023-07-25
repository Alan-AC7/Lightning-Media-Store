import React, { useState, useEffect } from "react";
import './App.css';
import QRCode from "react-qr-code";



const media = [
  {
    name: "ANIME GIRL WALLPAPER",
    price: 250,
    source: "01.jpg",
    invoice: "",
    paymentHash: "",
    buyButton: false,
    checkButton: true,
    fileDownloadUrl: ""
  },
  {
    name: "GOKU UI WALLPAPER",
    price: 1000,
    source: "02.jpg",
    invoice: "",
    paymentHash: "",
    buyButton: false,
    checkButton: true,
    fileDownloadUrl: ""
  },
  {
    name: "AURORA BOREALIS WALLPAPER",
    price: 2000,
    source: "03.jpg",
    invoice: "",
    paymentHash: "",
    buyButton: false,
    checkButton: true,
    fileDownloadUrl: ""
  }
]


function Media(props) {

  
  const [mediaList, setMedia] = useState(media);

  useEffect(() => {
    
  }, [props.invoice, props.fileDownloadUrl]);

  const generateInvoiceAndCheck = async (source, price) => {
    const data = await (await fetch(`/generate-invoice/${source}/${price}`)).json()
   


    const updateMedia = mediaList.map((m) => {
      if (m.source === source) {
        const updatedMedia = {
          ...m,
          invoice: data.payment_request,
          buyButton: true,
          checkButton: false
        };
        return updatedMedia;
      }
      return m;
    });
    await setMedia(updateMedia);

    const dataInvoiceStream = await (await fetch(`/check-invoice-steam/${data.payment_request}`)).json()

  
    if (dataInvoiceStream.settled === true) {
        const resGetContent =  await getContent(dataInvoiceStream.memo)
        const updateMedia = mediaList.map((m) => {
            if (m.source === dataInvoiceStream.memo) {
            return {
                ...m,
                status: true,
                invoice: 'Thanks. This payment of ' + dataInvoiceStream.amt_paid_sat + ' sats was settled at ' + dataInvoiceStream.settle_date + '.',
                checkButton: false,
                fileDownloadUrl: resGetContent
            };
            }
            return m;
        });
        await setMedia(updateMedia);
    }
  }
  

  

  async function getContent(source) {
    return await fetch(`/file/${source}`)
      .then(res => res.blob())
      .then(blob => URL.createObjectURL(blob))
  }

  return (
    
    <table className="media-table" >
    <tbody>
      {mediaList.map((m) => (
        <tr key={m.source}>
          <td>
            <h1>{m.name}</h1>
            <img src={`assets/${m.source}small.jpg`} height="220px" alt={m.name} />
            <p>Price: {m.price} sats</p>
          </td>
          <></>
          <td>
            <span
              className={m.status ? 'status-paid' : 'status-not-paid'}
              type="button"
            >
              {m.status ? 'Paid successfully' : ' Content not paid yet'}
            </span>
            <br /><br />
            <button
              disabled={m.buyButton}
              className="buy-button"
              type="button"
              onClick={() => { generateInvoiceAndCheck(m.source, m.price) }}
            >
              Buy
            </button>
            {m.buyButton && (
              <>
                <br /><br />
                <QRCode value={m.invoice} />
              </>
            )}
            {m.buyButton && (
              <>
                <br /><br />
                <textarea
                  className="invoice-textarea"
                  rows="9"
                  cols="32"
                  value={m.invoice}
                  readOnly
                />
              </>
            )}
            {m.status && (
              <>
                <br /><br />
                <a href={m.fileDownloadUrl} rel="noreferrer" target="_blank">
                  VIEW ONLINE
                </a>{' '}
                <a href={m.fileDownloadUrl} rel="noreferrer" target="_blank" download>
                  DOWNLOAD
                </a>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  
  )
}

const media2 = [
  {
    name: "THE BITCOIN STANDARD BY SAIFEDEAN AMMOUS",
    price: 3000,
    source: "BTCstandard.pdf",
    invoice: "",
    paymentHash: "",
    buyButton: false,
    checkButton: true,
    fileDownloadUrl: ""
  },
  {
    name: "THE PRICE OF TOMORROW BY JEFF BOOTH",
    price: 1500,
    source: "POT.pdf",
    invoice: "",
    paymentHash: "",
    buyButton: false,
    checkButton: true,
    fileDownloadUrl: ""
  },
  {
    name: "LIGHTNING NETWORK WHITEPAPER BY JOSEPH POON AND THADDEUS DRYJA",
    price: 200,
    source: "LNW.pdf",
    invoice: "",
    paymentHash: "",
    buyButton: false,
    checkButton: true,
    fileDownloadUrl: ""
  }
]


function Media2(props) {

  
  const [mediaList2, setMedia2] = useState(media2);

  useEffect(() => {
    
  }, [props.invoice, props.fileDownloadUrl]);

  const generateInvoiceAndCheck = async (source, price) => {
    const data = await (await fetch(`/generate-invoice/${source}/${price}`)).json()
   


    const updateMedia2 = mediaList2.map((m) => {
      if (m.source === source) {
        const updatedMedia2 = {
          ...m,
          invoice: data.payment_request,
          buyButton: true,
          checkButton: false
        };
        return updatedMedia2;
      }
      return m;
    });
    await setMedia2(updateMedia2);

    const dataInvoiceStream = await (await fetch(`/check-invoice-steam/${data.payment_request}`)).json()

  
    if (dataInvoiceStream.settled === true) {
        const resGetContent =  await getContent(dataInvoiceStream.memo)
        const updateMedia2 = mediaList2.map((m) => {
            if (m.source === dataInvoiceStream.memo) {
            return {
                ...m,
                status: true,
                invoice: 'Thanks. This payment of ' + dataInvoiceStream.amt_paid_sat + ' sats was settled at ' + dataInvoiceStream.settle_date + '.',
                checkButton: false,
                fileDownloadUrl: resGetContent
            };
            }
            return m;
        });
        await setMedia2(updateMedia2);
    }
  }
  

  

  async function getContent(source) {
    return await fetch(`/file/${source}`)
      .then(res => res.blob())
      .then(blob => URL.createObjectURL(blob))
  }

  return (
    
    <table className="media-table" >
    <tbody>
      {mediaList2.map((m) => (
        <tr key={m.source}>
          <td>
            <h1>{m.name}</h1>
            <p>Price: {m.price} sats</p>
          </td>
          <></>
          <td>
            <span
              className={m.status ? 'status-paid' : 'status-not-paid'}
              type="button"
            >
              {m.status ? 'Paid successfully' : ' Content not paid yet'}
            </span>
            <br /><br />
            <button
              disabled={m.buyButton}
              className="buy-button"
              type="button"
              onClick={() => { generateInvoiceAndCheck(m.source, m.price) }}
            >
              Buy
            </button>
            {m.buyButton && (
              <>
                <br /><br />
                <QRCode value={m.invoice} />
              </>
            )}
            {m.buyButton && (
              <>
                <br /><br />
                <textarea
                  className="invoice-textarea"
                  rows="9"
                  cols="32"
                  value={m.invoice}
                  readOnly
                />
              </>
            )}
            {m.status && (
              <>
                <br /><br />
                <a href={m.fileDownloadUrl} rel="noreferrer" target="_blank">
                  READ ONLINE
                </a>{' '}
                <a href={m.fileDownloadUrl} rel="noreferrer" target="_blank" download>
                  DOWNLOAD
                </a>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  
  )
}

const media3 = [
  {
    name: "IM STILL STANDING - ELTON JOHN",
    price: 3000,
    source: "song1.mp3",
    invoice: "",
    paymentHash: "",
    buyButton: false,
    checkButton: true,
    fileDownloadUrl: ""
  },
  {
    name: "I FEEL IT COMING - THE WEEKND",
    price: 2000,
    source: "song2.mp3",
    invoice: "",
    paymentHash: "",
    buyButton: false,
    checkButton: true,
    fileDownloadUrl: ""
  },
  {
    name: "CUPID - FIFTY FIFTY",
    price: 1200,
    source: "song3.mp3",
    invoice: "",
    paymentHash: "",
    buyButton: false,
    checkButton: true,
    fileDownloadUrl: ""
  }
]


function Media3(props) {

  
  const [mediaList3, setMedia3] = useState(media3);

  useEffect(() => {
    
  }, [props.invoice, props.fileDownloadUrl]);

  const generateInvoiceAndCheck = async (source, price) => {
    const data = await (await fetch(`/generate-invoice/${source}/${price}`)).json()
   


    const updateMedia3 = mediaList3.map((m) => {
      if (m.source === source) {
        const updatedMedia3 = {
          ...m,
          invoice: data.payment_request,
          buyButton: true,
          checkButton: false
        };
        return updatedMedia3;
      }
      return m;
    });
    await setMedia3(updateMedia3);

    const dataInvoiceStream = await (await fetch(`/check-invoice-steam/${data.payment_request}`)).json()

  
    if (dataInvoiceStream.settled === true) {
        const resGetContent =  await getContent(dataInvoiceStream.memo)
        const updateMedia3 = mediaList3.map((m) => {
            if (m.source === dataInvoiceStream.memo) {
            return {
                ...m,
                status: true,
                invoice: 'Thanks. This payment of ' + dataInvoiceStream.amt_paid_sat + ' sats was settled at ' + dataInvoiceStream.settle_date + '.',
                checkButton: false,
                fileDownloadUrl: resGetContent
            };
            }
            return m;
        });
        await setMedia3(updateMedia3);
    }
  }
  

  

  async function getContent(source) {
    return await fetch(`/file/${source}`)
      .then(res => res.blob())
      .then(blob => URL.createObjectURL(blob))
  }

  return (
    
    <table className="media-table" >
    <tbody>
      {mediaList3.map((m) => (
        <tr key={m.source}>
          <td>
            <h1>{m.name}</h1>
            <p>Price: {m.price} sats</p>
          </td>
          <></>
          <td>
            <span
              className={m.status ? 'status-paid' : 'status-not-paid'}
              type="button"
            >
              {m.status ? 'Paid successfully' : ' Content not paid yet'}
            </span>
            <br /><br />
            <button
              disabled={m.buyButton}
              className="buy-button"
              type="button"
              onClick={() => { generateInvoiceAndCheck(m.source, m.price) }}
            >
              Buy
            </button>
            {m.buyButton && (
              <>
                <br /><br />
                <QRCode value={m.invoice} />
              </>
            )}
            {m.buyButton && (
              <>
                <br /><br />
                <textarea
                  className="invoice-textarea"
                  rows="9"
                  cols="32"
                  value={m.invoice}
                  readOnly
                />
              </>
            )}
            {m.status && (
              <>
                <br /><br />
                <a href={m.fileDownloadUrl} rel="noreferrer" target="_blank">
                  LISTEN ONLINE
                </a>{' '}
                <a href={m.fileDownloadUrl} rel="noreferrer" target="_blank" download>
                  DOWNLOAD
                </a>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  
  )
}



function App() {
  

  

  return (



    
    <div>
       <section className="title">
      <img className="imagen1" src="assets/samurai.png" alt="User" />
      <h1>SATOSHI'S SAMURAIS GALLERY</h1>
      <img className="imagen1" src="assets/samurai.png" alt="User" />
    </section>

    <h1>  WALLPAPERS </h1>
    
    <div class="principal">

      <Media />
    </div>

    <h1> BOOKS </h1>

    <div class="principal">
    
      <Media2 />
    </div>
    <h1> MUSIC </h1>
    <div class="principal">
    
    <Media3 />
  </div>



    </div>
    
    
  );
}

export default App;

