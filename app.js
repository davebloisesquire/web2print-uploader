const fileUploadArea = document.getElementById("file-upload");
const fileUploadSubmit = document.getElementById("file-submit");
let fileList = "<h1>File List:</h1><br>";

fileUploadSubmit.addEventListener("click", () => {
    alert("Don't do nothin yet hoss")
})

fileUploadArea.addEventListener("change", () => {
    for (let i = 0; i < fileUploadArea.files.length; i++) {
        const file = fileUploadArea.files[i];
        addPdfsToBucket(file)
            // setupReader(file);
    }
})

function addPdfsToBucket(file) {
    var storage = firebase.storage().ref(file.name);
    var upload = storage.put(file);

    upload.on(
        "state_changed",
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById("progress").value = percentage;
        },
        function error() {
            alert("error uploading file");
        },
        function complete() {
            //document.getElementById("uploading").innerHTML += `${file.name} uploaded <br />`;
            storage.getDownloadURL().then((url) => {
                setupReader(file, url);
            })
        }
    )
}

function setupReader(file, url) {
    console.log(file);

    const fileReader = new FileReader();
    fileReader.onload = () => {
        checkFile(fileReader.result, file.name, url)
    }
    fileReader.readAsBinaryString(file)
}

function checkFile(text, fileName, pdfUrl) {
    let contourCheck;
    let cutContourCheck;
    let perfCutContourCheck;

    if (text.includes("<rdf:li>CutContour</rdf:li>") && text.includes("<rdf:li>PerfCutContour</rdf:li>")) {
        contourCheck = "success"
    } else {
        contourCheck = "danger"
    }

    text.includes("<rdf:li>CutContour</rdf:li>") ? cutContourCheck = "success" : contourCheck = "danger";
    text.includes("<rdf:li>PerfCutContour</rdf:li>") ? perfCutContourCheck = "success" : perfCutContourCheck = "danger";


    const width = Number(text.match(/(?<=\<stDim\:w\>).*?(?=\<\/stDim\:w\>)/gs));
    const height = Number(text.match(/(?<=\<stDim\:h\>).*?(?=\<\/stDim\:h\>)/gs));
    const skuNumber = fileName.match(/[0-9]{4,5}/);

    console.log(pdfUrl);

    fileList = fileList + `<div class="card mb-3 border-${contourCheck}">
    <div class="row g-0">
      <div class="col-md-4">
      <embed
      class="item-pdf"
      src="${pdfUrl}"
      type="application/pdf"
      scrolling="none"
      height="200px"
      width="auto"
  ></embed>
        <!-- <img src="pdf.png" data-pdf-thumbnail-file="${pdfUrl}" class="img-fluid rounded-start" alt="img"> -->
      </div>
      <div class="col-md-8">
        <div class="card-body text-${contourCheck}">
            <p class="card-text">File Name: ${fileName} - Width: ${width}" by Height: ${height}"</p>
            <div class="input-group mb-3">
                <span class="input-group-text">sku</span>
                <input type="text" aria-label="sku number" class="form-control" value="${skuNumber}">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Quantity</span>
                <input type="number" class="form-control" value="50">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Product Type</span>
                <select name="" id="" class="form-control">
                    <option value="sticker" selected>Sticker</option>
                    <option value="magnet">Magnet</option>
                    <option value="acrylic-magnet">Acylic Magnet</option>
                    <option value="coaster">Coaster</option>
                </select>
            </div>
            <div class="mb-3">
            <label for="formFile" class="form-label">UPC Info</label>
                <div class="input-group mb-3">
                    <div class="input-group-text">
                        <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                    </div>
                    <input type="text" aria-label="design name" class="form-control" placeholder="name">
                    <input type="text" aria-label="design number" class="form-control" placeholder="number">
                    <input type="text" aria-label="upc barcode" class="form-control" placeholder="upc barcode">
                    <input type="text" aria-label="retail price" class="form-control" placeholder="price">
                    <input type="text" aria-label="item number" class="form-control" placeholder="item">
                </div>
            </div>
          <p class="card-text"><small class="text-muted"><span class="badge text-bg-${cutContourCheck}">CutContour</span><span class="badge text-bg-${perfCutContourCheck}">PerfCutContour</span></small></p>
        </div>
      </div>
    </div>
</div>`

    document.getElementById('dims-area').innerHTML = fileList
    createPDFThumbnails();
}