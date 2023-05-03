from flask import *

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("admin.html")


@app.route("/update", methods=["POST"])
def update():
    return render_template("update.html")


@app.route("/recover", methods=["POST"])
def recover():
    return render_template("recover.html")


@app.route("/owner")
def owner():
    return render_template("owner.html")


if __name__ == "__main__":
    app.run()
