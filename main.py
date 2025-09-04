from flask import Flask, request, jsonify

app = Flask(__name__)

# سوالات اولیه
questions = {
    "task_type": ["MMH", "Non-MMH", "Special-Purpose"],
    "mmh_subtype": ["Lifting", "Carrying", "Pushing/Pulling"],
    "evaluation_purpose": ["Screening", "Max Weight Assessment"]
}

# مسیر تصمیم‌گیری بر اساس پاسخ‌های کاربر


def determine_path(answers):
    if answers["task_type"] == "MMH":
        return "ارزیابی ارگونومی حمل بار"
    elif answers["task_type"] == "Non-MMH":
        return "بررسی وضعیت بدن در محیط‌های دفتری"
    else:
        return "ارزیابی وظایف خاص"


@app.route('/process_answers', methods=['POST'])
def process_answers():
    data = request.json
    recommended_path = determine_path(data)
    return jsonify({"recommended_path": recommended_path})


if __name__ == "__main__":
    app.run(debug=True)


# MMH


app = Flask(__name__)


def recommend_assessment(data):
    if data["task-type"] == "pushing-pulling":
        return "🔹 روش‌های پیشنهادی: Arbouw، ISO11228-2، Snook"
    elif data["task-type"] == "lifting":
        return "🔹 روش‌های پیشنهادی: EN1005-2، ISO11228-1"
    elif data["task-type"] == "moving":
        return "🔹 روش‌های پیشنهادی: EN1005-2، Snook، Arbouw"

    return "✅ لطفاً اطلاعات بیشتری وارد کنید تا روش ارزیابی مناسبی پیشنهاد شود."


@app.route('/process_mmh_assessment', methods=['POST'])
def process_mmh_assessment():
    data = request.json
    result = recommend_assessment(data)
    return jsonify({"assessment": result})


if __name__ == "__main__":
    app.run(debug=True)
