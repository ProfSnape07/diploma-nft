from flask import *

from func import *

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/view", methods=["POST"])
def view():
    certificate_number = request.form.get("certificate_number")
    if not isvalid_certificate(certificate_number):
        return render_template("index.html", _certificate_error="*You have entered an invalid certificate number.")
    if exists_certificate(certificate_number):
        diploma_struct = search_with_certificate(certificate_number)
        university = diploma_struct[0]
        studentName = diploma_struct[1]
        enrolmentNumber = diploma_struct[2]
        program = diploma_struct[3]
        specialisation = diploma_struct[4]
        gpa = diploma_struct[5]
        dateOfIssue = reverse_unix_timestamp(diploma_struct[6])
        if not dateOfIssue:
            dateOfIssue = ""
        image_uri = tokenuri_to_imageuri(diploma_struct[7])
        if not image_uri:
            image_uri = "/static/icon/icon.png"

        return render_template("view.html", _imageURI=image_uri, _university=university, _studentName=studentName,
                               _enrolmentNumber=enrolmentNumber, _program=program, _specialisation=specialisation,
                               _gpa=gpa, _certificateNumber=certificate_number, _dateOfIssue=dateOfIssue)

    else:
        return render_template("index.html", _certificate_error="*We haven't found any Diploma with this "
                                                                "certificate number.")


@app.route("/search", methods=["POST"])
def search():
    wallet_address = request.form.get("wallet_address")
    enrolment_number = request.form.get("enrolment_number")
    if wallet_address:
        if isvalid_address(wallet_address):
            if not search_with_address(wallet_address):
                return render_template("index.html", _address_error="*We haven't found any Diploma issued on this "
                                                                    "address.")
            else:
                results = search_with_address(wallet_address)
                return render_template("search.html", results=results)

        else:
            return render_template("index.html", _address_error="*You have entered an invalid address.")

    elif enrolment_number:
        if not isvalid_enrolment(enrolment_number):
            return render_template("index.html", _enrolment_error="*You have entered an invalid enrolment number.")
        else:
            results = search_with_enrolment(enrolment_number)
            if len(results):
                return render_template("search.html", results=results)
            else:
                return render_template("index.html", _enrolment_error="*No record found for this enrolment number.")


if __name__ == "__main__":
    app.run()
