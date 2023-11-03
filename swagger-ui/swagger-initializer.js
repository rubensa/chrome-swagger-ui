window.onload = () => {
  const config = {
    url: 'https://petstore.swagger.io/v2/swagger.json',
    dom_id: '#swagger-ui',
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    requestInterceptor: (req) => {
      var accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        // Only set Authorization header if the request matches the spec URL
        var url = config.url;
        if (window.ui && window.ui.getState() && window.ui.getState().get('spec') && window.ui.getState().get('spec').get('url')) {
          url = window.ui.getState().get('spec').get('url');
        }
        url = url.substring(0, url.lastIndexOf('/'));
        if (req.url.startsWith(url)) {
          console.log('Setting Authorization header for ' + req.url);
          req.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
        }
      }
      return req;
    },
    validatorUrl: null,
    onComplete: () => {
      addAuthButton();
    }
  };
  const ui = SwaggerUIBundle(config);
  window.ui = ui;
};

function addAuthButton() {
  var container = document.querySelector('.topbar-wrapper');
  var div = document.getElementById('custom-auth-button-wrapper');
  if (div == null) {
    div = document.createElement('div');
    div.setAttribute('id', 'custom-auth-button-wrapper');
    var button = document.createElement('button');
    var unAuthorizedIco = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false"><path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V6h2v-.801C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8z"></path></svg>';
    button.innerHTML = '<span>Authorize Spec</span>' + unAuthorizedIco;
    button.setAttribute('id', 'custom-auth-button');
    button.setAttribute('class', 'btn authorize unlocked');
    button.style = 'border-color: #62a03f; color: #fff; margin-left: 5px;';
    button.addEventListener('click', function (event) {
      event.preventDefault()
      var token = prompt('Enter JWT access token token. Eg. eyJraW...qJSaxQ')
      if (!token) {
        localStorage.removeItem('accessToken');
        alert('Token cleared');
        var button = document.getElementById('custom-auth-button');
        var unAuthorizedIco = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false"><path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V6h2v-.801C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8z"></path></svg>';
        button.innerHTML = '<span>Authorize Spec</span>' + unAuthorizedIco;
      } else {
        token = token.replace(/[^\d\w_.-]/gi, '');
        localStorage.setItem('accessToken', token);
        var button = document.getElementById('custom-auth-button');
        var authorizedIco = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false"><path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8zM12 8H8V5.199C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8z"></path></svg>';
        button.innerHTML = '<span>Authorize Spec</span>' + authorizedIco;
      }
    });
    div.appendChild(button);
    container.appendChild(div);
  }
}