// Formatter
$('input.number').keyup(function (event) {

    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // Number Format
    $(this).val(function (index, value) {
        return value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
});

let preview_image = () => {
    let reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('output');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
};

let ROIcalculation = () => {
    let formatter = new Intl.NumberFormat('en-US');

    let propertySize = parseInt(document.getElementById('propertySize').value.replaceAll(",", ""));
    document.getElementById('propertySize').value = formatter.format(propertySize);

    let serviceCharge = parseInt(document.getElementById('serviceCharge').value.replaceAll(",", ""));
    document.getElementById('serviceCharge').value = formatter.format(serviceCharge);

    let totalCharge = (propertySize * serviceCharge);
    if (!isNaN(totalCharge)) {
        document.getElementById('yearlyServiceCharge').value = formatter.format(totalCharge);
    }

    let rentValue = parseInt(document.getElementById('rentValue').value.replaceAll(",", ""));
    document.getElementById('rentValue').value = formatter.format(rentValue);

    let maintenanceContract = parseInt(document.getElementById('maintenanceContract').value.replaceAll(",", ""));
    document.getElementById('maintenanceContract').value = formatter.format(maintenanceContract);

    let propertyManagement = parseInt(document.getElementById('propertyManagement').value.replaceAll(",", ""));
    document.getElementById('propertyManagement').value = formatter.format(propertyManagement);

    let yearlyServiceCharge = parseInt(document.getElementById('yearlyServiceCharge').value.replaceAll(",", ""));
    document.getElementById('yearlyServiceCharge').value = formatter.format(yearlyServiceCharge);

    let propertyValue = parseInt(document.getElementById('propertyValue').value.replaceAll(",", ""));
    document.getElementById('propertyValue').value = formatter.format(propertyValue);

    let netROIAmount = parseInt(document.getElementById('netROIAmount').value.replaceAll(",", ""));



    if (!isNaN(rentValue && yearlyServiceCharge)) {

        if (isNaN(maintenanceContract || propertyManagement)) {
            if (isNaN(propertyManagement && maintenanceContract)) {
                netROIAmount = rentValue - yearlyServiceCharge;
                document.getElementById('netROIAmount').value = formatter.format(netROIAmount);
                document.getElementById('maintenanceContract').value = 0;
                document.getElementById('propertyManagement').value = 0;
            } else {
                if (isNaN(propertyManagement)) {
                    netROIAmount = rentValue - maintenanceContract - yearlyServiceCharge;
                    document.getElementById('netROIAmount').value = formatter.format(netROIAmount);
                    document.getElementById('propertyManagement').value = 0;
                } else {
                    netROIAmount = rentValue - propertyManagement - yearlyServiceCharge;
                    document.getElementById('netROIAmount').value = formatter.format(netROIAmount);
                    document.getElementById('maintenanceContract').value = 0;
                }
            }
        } else {
            netROIAmount = rentValue - maintenanceContract - propertyManagement - yearlyServiceCharge;
            document.getElementById('netROIAmount').value = formatter.format(netROIAmount);
        }

    }


    let netROI = ((netROIAmount / propertyValue) * 100);

    if (!isNaN(netROI)) {
        document.getElementById('netROI').value = formatter.format(netROI) + '%';
    }
};

let ROIpdf = () => {

    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });
    let pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    let pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    let right = pageWidth / 4;
    let left = (pageWidth * 3) / 4;

    //color

    console.log(right);
    console.log(left);
    console.log(pageWidth);
    console.log(pageHeight);


    let opt = {
        align: 'right',
        angle: 90,
        width: 100
    };





    let output = document.getElementById("output");
    let imageData = output.src;
    if (imageData == '')
        alert('Please upload logo');


    else {

        //Left side content

        doc.addImage(imageData, 'jpeg', 15, 15, 60, 30);

        let propertyDetails = document.getElementById("propertyDetails");
        doc.fromHTML(propertyDetails, 15, 45);

        let buildingName = document.getElementById("buildingName");
        doc.fromHTML(buildingName, 15, 60);
        let propertyReference = document.getElementById("propertyReference").value;
        doc.setFontSize(11).setFont("times", "normal").setTextColor(128).text(propertyReference, right, 85, 'center').setDrawColor(255, 0, 0).setLineWidth(9 / 30).roundedRect(15, 79, 75, 9, 1, 1, 'D');

        let sellingPrice = document.getElementById("sellingPrice");
        doc.fromHTML(sellingPrice, 15, 90);
        let propertyValue = document.getElementById("propertyValue").value;
        doc.text(propertyValue, right, 115, 'center').setTextColor(150).setDrawColor(255, 0, 0).setLineWidth(.3).roundedRect(15, 109, 75, 9, 1, 1, 'D');

        let expenses = document.getElementById("expenses");
        doc.fromHTML(expenses, 15, 115);

        let yearlyMC = document.getElementById("yearlyMC");
        doc.fromHTML(yearlyMC, 15, 130);
        let maintenanceContract = document.getElementById("maintenanceContract").value;
        doc.text(maintenanceContract, right, 155, 'center').setTextColor(150).setDrawColor(255, 0, 0).setLineWidth(.3).roundedRect(15, 149, 75, 9, 1, 1, 'D');

        let serviceChargeCost = document.getElementById("serviceChargeCost");
        doc.fromHTML(serviceChargeCost, 15, 160);
        let serviceCharge = document.getElementById("serviceCharge").value;
        doc.text(serviceCharge, right, 185, 'center').setTextColor(150).setDrawColor(255, 0, 0).setLineWidth(.3).roundedRect(15, 179, 75, 9, 1, 1, 'D');

        let yearlyROI = document.getElementById("yearlyROI");
        doc.fromHTML(yearlyROI, 15, 190);
        let netROIAmount = document.getElementById("netROIAmount").value;
        doc.text(netROIAmount, right, 215, 'center').setTextColor(150).setDrawColor(255, 0, 0).setLineWidth(.5).roundedRect(15, 209, 75, 9, 1, 1, 'D');


        // Right side

        let subject = document.getElementById("subject").value;
        doc.setFontSize(16).setFont("times", "normal").text(subject, 123, 17).setTextColor(150);

        let size = document.getElementById("size");
        doc.fromHTML(size, 120, 60);
        let propertySize = document.getElementById("propertySize").value;
        doc.setFontSize(11).text(propertySize, left, 85, 'center').setTextColor(150).setDrawColor(255, 0, 0).setLineWidth(.3).roundedRect(120, 79, 75, 9, 1, 1, 'D');

        let yearlyRent = document.getElementById("yearlyRent");
        doc.fromHTML(yearlyRent, 120, 90);
        let rentValue = document.getElementById("rentValue").value;
        doc.text(rentValue, left, 115, 'center').setTextColor(150).setDrawColor(255, 0, 0).setLineWidth(.3).roundedRect(120, 109, 75, 9, 1, 1, 'D');

        let yearlyPM = document.getElementById("yearlyPM");
        doc.fromHTML(yearlyPM, 120, 130);
        let propertyManagement = document.getElementById("propertyManagement").value;
        doc.text(propertyManagement, left, 155, 'center').setTextColor(150).setDrawColor(255, 0, 0).setLineWidth(.3).roundedRect(120, 149, 75, 9, 1, 1, 'D');

        let totalyService = document.getElementById("totalyService");
        doc.fromHTML(totalyService, 120, 160);
        let yearlyServiceCharge = document.getElementById("yearlyServiceCharge").value;
        doc.text(yearlyServiceCharge, left, 185, 'center').setTextColor(150).setDrawColor(255, 0, 0).setLineWidth(.5).roundedRect(120, 179, 75, 9, 1, 1, 'D');

        let yearlyNetROI = document.getElementById("yearlyNetROI");
        doc.fromHTML(yearlyNetROI, 120, 190);
        let netROI = document.getElementById("netROI").value;
        doc.text(netROI, left, 215, 'center').setTextColor(150).setDrawColor(255, 0, 0).roundedRect(120, 209, 75, 9, 1, 1, 'D');



        console.log(output.src);
        console.log(doc);



        // Full Content

        let notes = document.getElementById("notes").value;
        doc.text(notes, 18, 230).setTextColor(150).setDrawColor(255, 0, 0).setLineWidth(.3).roundedRect(15, 225, 180, 27, 1, 1, 'D');

        let note = doc.splitTextToSize("Note: This ROI Calculator is an illustration for educational and informational purposes only, and should not be considered as a rental guarantee.", 160);

        doc.setFontSize(13).setTextColor(0).text(note, 15, 265);

        // FOOTER
        let footer = "1";
        doc.setFontSize(10).text(footer, pageWidth / 2, pageHeight - 10, 'center').setTextColor(100);

        doc.save("ROI.pdf");
    }

}