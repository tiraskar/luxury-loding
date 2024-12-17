import { useEffect, useRef } from 'react';

const AuthorizeNetSeal = () => {
    const iframeRef = useRef(null);

    useEffect(() => {
        if (iframeRef.current) {
            const iframe = iframeRef.current;
            const doc = iframe.contentDocument || iframe.contentWindow.document;

            // Write the seal HTML directly into the iframe
            doc.open();
            doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Authorize.Net Seal</title>
          </head>
          <body style="margin:0;padding:0;">
            <!-- (c) 2005, 2024. Authorize.Net is a registered trademark of CyberSource Corporation -->
            <div class="AuthorizeNetSeal">
              <script type="text/javascript">var ANS_customer_id="6b2374e5-b197-45c1-8489-647d39077908";</script>
              <script type="text/javascript" src="https://verify.authorize.net/anetseal/seal.js"></script>
            </div>
          </body>
        </html>
      `);
            doc.close();
        }
    }, []);

    return (
        <iframe
            ref={iframeRef}
            title="Authorize.Net Seal"
            style={{
                width: '150px',
                height: '100px',
                border: 'none',
                overflow: 'hidden',
                display: 'block'
            }}
        />
    );
};

export default AuthorizeNetSeal;