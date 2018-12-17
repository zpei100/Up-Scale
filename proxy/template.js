module.exports = function(hosts, initialStates, htmls) {

  //assumes initialstates do not have name conflicts???
  
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Upscale</title>

    <link rel="stylesheet" href="${hosts.overviewsHost}/styles.css">
   
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous">
  </head>
  
  <body>
    <script>window.__initialState__ = ${JSON.stringify(initialStates.overviewsInitialState || {})}</script>
    
    <div id="app">
   
      <div id="gallery" class="d-flex" style="width: 100vw; height: auto; object-fit: cover" >
        ${htmls.galleryHtml || ''}
      </div>

      <div id="Info">
        ${htmls.productInfoHtml || ''}
      </div>

        ${htmls.overviewsHtml || ''}

      <div id="reviews">
        ${htmls.reviewsHtml || ''}
      </div>

 
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em" crossorigin="anonymous"></script>
    
    <script src="${hosts.overviewsHost}/bundle.js"></script>
  </body>
  </html>
  `;
};
