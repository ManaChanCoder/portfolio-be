export const contactFormTemplate = (name, email, subject, message) => {
  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact Form</title>
        <style>
          * {
            font-size: 1rem;
            font-family: Arial, Helvetica, sans-serif;
          }
          .main-container {
            width: 100%;
            padding: 12px;
            background: #f4eded;
          }
          .header {
            background: #202855;
            padding: 10px 0;
          }
          footer > h2 {
            font-weight: 600;
            color: #3f4042;
          }
          footer > p {
            text-align: center;
            opacity: 0.5;
          }
          .header > h1 {
            text-align: center;
            font-weight: 800;
            color: #fff;
            font-size: 1.4rem;
            font-style: italic;
            text-transform: uppercase;
          }
          .main-container > p > span {
            font-weight: 600;
            color: #202855;
            text-transform: none;
          }
        </style>
      </head>
      <body>
        <div class="main-container">
          <div class="header">
            <h1>Portfolio Contact Form</h1>
          </div>
          <br />
          <p>You received a message from the <span>portfolio</span> contact form</p>
          <br />
          <p>Name: <span>${name}</span></p>
          <p>Email: <span>${email}</span></p>
          <p>Subject: <span>${subject}</span></p>
          <br />
          <p>
            Message: <br />
            <span>${message}</span>
          </p>
          <br />
          <footer>
            <h2>
              Best regards, <br />
              <span>Manachan Coder</span>
            </h2>
            <p>This is an automatically generated email, please do not reply</p>
          </footer>
        </div>
      </body>
    </html>
    `;
};
