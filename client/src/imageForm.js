// form for image form
const form = `
<form>
<h1>Image API form submission</h1>
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" placeholder="Enter the image title" name="title">
  </div>
  <div class="form-group">
    <label for="imageUrl">Image URL</label>
    <input type="text" class="form-control" id="imageUrl" placeholder="Enter the image url" name="imageUrl">
  </div>
  <div class="form-group">
    <label for="year">Year Created</label>
    <input type="text" class="form-control" id="year" placeholder="Enter the year of creation" name="year">
  </div>
  <div class="form-group">
  <label for="artistNameId">Artist</label>
    <select name="artNameId" id="artists"></select>
  </div>
  <div class="form-group">
    <label for="artCategoryId">Category</label>
    <select name="artCategoryId" id="artCategories"></select>
  </div>
  <div class="form-group">
    <label for="imageId">Image Id (Only used for update/delete)</label>
    <input type="text" class="form-control" id="imageId" placeholder="Enter the image Id" name="imageId">
  </div>
  <button type="button" id="createImageObject" class="btn btn-primary">Create Image Object</button>
  <button type="button" id="editImageObject" class="btn btn-primary">Edit Image Object</button>
  <button type="button" id="deleteImageObject" class="btn btn-primary">Delete Image Object</button>
</form>
`;

const imageForm = () => {
// create drop down menu for artist options
const artistResponse = $.ajax({
    type: "GET",
    url: "/api/images/artist/all"
  }).done((response) => {
    // does 'response' in lines 47, 62 need to be the parameter in the round brackets above?
    console.log('artists', response);
    let optionsHtml = "";
    response.forEach((artistEl) => {
      console.log('artistEl', artistEl);
      optionsHtml += `<option value=${artistEl._id}>${artistEl.name}</option>`;
      console.log('optionsHtml:', optionsHtml);
    });
    console.log('optionsHtml:', optionsHtml);
    $('#artists').append(optionsHtml);
  });

// create drop down menu for art category options
const artCategoryResponse = $.ajax({
    type: "GET",
    url: "/api/images/category/all"
  }).done((response) => {
    console.log('response', response);
    let optionsHtml = "";
    response.forEach((categoryEl) => {
      console.log('categoryEl', categoryEl);
      optionsHtml += `<option value=${categoryEl._id}>${categoryEl.name}</option>`;
      console.log('optionsHtml:', optionsHtml);
    });
    console.log('optionsHtml:', optionsHtml);
    $('#artCategories').append(optionsHtml);
  });

// Event listener to for Create image Button
  $(document).on("click", "#createImageObject", async (e) => {
    e.preventDefault();
    // construct body by extracting info from form
    const requestBody = {
      title: $("#title").val(),
      imageUrl: $("#imageUrl").val(),
      year: $("#year").val(),
      artistNameId: $("#artists").val(),
      artCategoryId: $("#artCategories").val(),
    };
  // make a POST request to the server to create image
    const response = await $.ajax({
      type: "POST", 
      url: "/api/images/new",
      contentType: "application/json",
      data: JSON.stringify(requestBody),
    });
    // // pop up alert that image created
    // window.alert("Image object created!");
    });  
    
// Event listener for edit image button
  $(document).on("click", "#editImageObject", async (e) => {
    e.preventDefault();
    // construct body by extracting info from form
    const requestBody = {
      title: $("#title").val(),
      imageUrl: $("#imageUrl").val(),
      year: $("#year").val(),
      artistNameId: $("#artists").val(),
      artCategoryId: $("#artCategories").val(),
    };
  // make a PATCH request to the server to edit image
    const response = await $.ajax({
      type: "PATCH", 
      url: `/api/images/update-image/${$("#imageId").val()}`,
      contentType: "application/json",
      data: JSON.stringify(requestBody),
    });
    // // pop up alert that image created
    // window.alert("Image object edited!");
    });  

    //Event listener for delete image button
  $(document).on("click", "#deleteImageObject", async (e) => {
    e.preventDefault();
    
  // make a PATCH request to the server to create image
    const response = await $.ajax({
      type: "DELETE", 
      // check if the #imageId needs to go anywhere!!!!!
      url: `/api/images/delete-image/${$("#imageId").val()}`,
      contentType: "application/json",
    });

    // //Create pop up alert that image created
    // window.alert("Image object edited!");
  }); 

  return form;
};

export default imageForm;
