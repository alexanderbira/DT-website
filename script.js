const generateHTML = plants => {
  $.each(plants, (index, { name, common_uses, light, wiki }) => {

    $("#tableContainer").append(

      //container
      $("<div>")
      .addClass("row")
      .append(

        //name
        $("<div>")
        .addClass("name item")
        .html(`
          <h3>${name}</h3>
        `),

        //image
        $("<img>")
        .addClass("image")
        .attr({
          alt: name,
          src: `/images/${name}.jpg`
        }),

        //uses
        $("<div>")
        .addClass("uses item")
        .html(`
          <h4>Uses</h4><hr><ul><li>${common_uses.join('</li><li>')}</li></ul>
        `),

        //last box
        $("<div>")
        .addClass("last item")
        .append(

          //light requirement
          $('<div>')
          .addClass('light')
          .html(`
            <h4>Light Requirement</h4><hr>${light} hours / day
          `),

          //further reading
          $('<div>')
          .addClass('link')
          .html(`
            <a href="${wiki}" target="_blank">Further reading</a>
          `)
        )
      )
    );
  });
}

const sortRows = () => {
  $.getJSON("data.json", data => {

    switch ($('#filter').val()) {
      case "name":
        data.sort((a,b)=>a.name.localeCompare(b.name));
        break;
      case "light":
        data.sort((a,b)=>a.light-b.light);
        break;
    }
    if (reverse) {
      data.reverse()
    }
    $(".row").remove();
    generateHTML(data);
  });
}

const changeOrder = () => {
  reverse = !reverse;
  $("#order").html(
    reverse ? `
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" data-icon="sort-ascending" viewBox="0 0 8 8"><path d="M2 0v6h-2l2.5 2 2.5-2h-2v-6h-1zm2 0v1h2v-1h-2zm0 2v1h3v-1h-3zm0 2v1h4v-1h-4z" fill="white" /></svg>
    ` : `
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" data-icon="sort-descending" viewBox="0 0 8 8"><path d="M2 0v6h-2l2.5 2 2.5-2h-2v-6h-1zm2 0v1h4v-1h-4zm0 2v1h3v-1h-3zm0 2v1h2v-1h-2z" fill="white" /></svg>
    `
  );
  sortRows();
}

let reverse = false;
$.getJSON("data.json", generateHTML);