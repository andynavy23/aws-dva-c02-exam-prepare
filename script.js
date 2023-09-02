// List of AWS service names
const aws_service_names = [
    "S3",
    "EC2",
    "IAM",
    "AMI",
    "VPC",
    "ARN",
    "RDS",
    "EBS",
    "Lambda",
    "CloudWatch",
    "Elastic Beanstalk",
    "AWS SDK",
    "AWS KMS",
    "AWS CLI",
    "AWS KMS",
    "Amazon SNS",
    "Amazon RDS",
    "Amazon EBS",
    "AWS Code Deploy",
    "Amazon Machine Image",
    "Amazon Resource Name",
    "Amazon Athena",
    "Amazon Kinesis",
    "Amazon OpenSearch Service",
    "AWS AppSync",
    "Amazon EventBridge",
    "Amazon Simple Notification Service",
    "Amazon Simple Queue Service",
    "AWS Step Functions",
    "Amazon EC2",
    "AWS Elastic Beanstalk",
    "AWS Lambda",
    "AWS Serverless Application Model",
    "AWS Copilot",
    "Amazon Elastic Container Registry",
    "Amazon Elastic Container Service",
    "Amazon Elastic Kubernetes Services",
    "Amazon Aurora",
    "Amazon DynamoDB",
    "Amazon ElastiCache",
    "Amazon MemoryDB for Redis",
    "Amazon RDS",
    "Amazon Elastic Block Store",
    "Amazon Elastic File System",
    "Amazon S3",
    "Amazon S3 Glacier",
    "AWS Amplify",
    "AWS Cloud9",
    "AWS CloudShell",
    "AWS CodeArtifact",
    "AWS CodeBuild",
    "AWS CodeCommit",
    "AWS CodeDeploy",
    "Amazon CodeGuru",
    "AWS CodePipeline",
    "AWS CodeStar",
    "AWS X-Ray",
    "AWS AppConfig",
    "AWS Cloud Development Kit (AWS CDK)",
    "AWS CloudFormation",
    "AWS CloudTrail",
    "Amazon CloudWatch",
    "Amazon CloudWatch Logs",
    "AWS Command Line Interface",
    "AWS Systems Manager",
    "Amazon API Gateway",
    "Amazon CloudFront",
    "Elastic Load Balancing",
    "Amazon Route 53",
    "Amazon VPC",
    "AWS Certificate Manager",
    "AWS Certificate Manager Private Certificate Authority",
    "Amazon Cognito",
    "AWS Identity and Access Management",
    "AWS Key Management Service",
    "AWS Secrets Manager",
    "AWS Security Token Service",
    "AWS WAF",
];
// Regular expression pattern to match AWS service names
const highlight_pattern = new RegExp(
    `\\b(${aws_service_names.join("|")})\\b`,
    "gi"
);
// get all questions
let questions = Array.from(
    document.getElementsByClassName("card exam-question-card")
);
const questions_back_up = questions.slice(0);
document.getElementById(
    "questions_count"
).innerText = `Left ${questions.length} questions`;
// hide all questions
document.getElementById("questions-container").innerHTML = "";
// all questions list
document.getElementById("sidebar").innerHTML = questions_back_up
    .map((item, index) => {
        return `<div class="sidebar-content"><button class="button-30" role="button" onclick="sidebar_question_click(${index})">Question ${
            index + 1
        }</button></div>`;
    })
    .join("");
let random_index;
let show_question_tag = false;
let show_anwser_tag = false;
let highlighted_content_backup = "";
let highlighted_tag = false;
let modal_tag = false;
let sidebar_click_tag = false;
// answer show or not function
function anwser_display_modifier(option) {
    if (
        document.getElementsByClassName(
            "card-text question-answer bg-light white-text"
        ).length > 0
    ) {
        document.getElementsByClassName(
            "card-text question-answer bg-light white-text"
        )[0].style.display = option;
    }
    if (
        document.getElementsByClassName(
            "voting-summary col-12 col-sm-6 col-lg-4 pt-2 pb-2"
        ).length > 0
    ) {
        document.getElementsByClassName(
            "voting-summary col-12 col-sm-6 col-lg-4 pt-2 pb-2"
        )[0].style.display = option;
    }
    if (document.getElementsByClassName("inline-discussion").length > 0) {
        document.getElementsByClassName("inline-discussion")[0].style.display =
            option;
    }
}

// show question button
function show_question_click() {
    if (show_question_tag == true && sidebar_click_tag == false) {
        const halfBeforeTheUnwantedElement = questions.slice(0, random_index);
        const halfAfterTheUnwantedElement = questions.slice(
            random_index + 1,
            questions.length
        );
        const copyWithoutThirdElement = halfBeforeTheUnwantedElement.concat(
            halfAfterTheUnwantedElement
        );
        questions = copyWithoutThirdElement;
        document.getElementById("questions-container").innerHTML = "";
        document.getElementById(
            "questions_count"
        ).innerText = `Left ${questions.length} questions`;
    } else if (show_question_tag == true && sidebar_click_tag == true) {
        document.getElementById("questions-container").innerHTML = "";
        sidebar_click_tag = false;
    }
    random_index = Math.floor(Math.random() * questions.length);
    document
        .getElementById("questions-container")
        .appendChild(questions[random_index]);
    anwser_display_modifier("none");
    show_question_tag = true;
    show_anwser_tag = false;
    highlighted_tag = false;
    document.getElementById("answer_style").remove();
}

// show anwser button
function show_anwser_click() {
    const css = `
        .multi-choice-item.correct-hidden .multi-choice-letter {
            font-weight: bold;
            color: green;
        }
    `;
    if (show_anwser_tag == true) {
        anwser_display_modifier("none");
        document.getElementById("answer_style").remove();
        show_anwser_tag = false;
    } else {
        anwser_display_modifier("inline");
        let css_item = document.createElement("style");
        css_item.id = "answer_style";
        css_item.innerHTML = css;
        document.head.appendChild(css_item);
        show_anwser_tag = true;
    }
}

// reset button
function reset_click() {
    location.reload();
}

function sidebar_question_click(question_index) {
    if (show_question_tag == true) {
        document.getElementById("questions-container").innerHTML = "";
    }
    document
        .getElementById("questions-container")
        .appendChild(questions_back_up[question_index]);
    anwser_display_modifier("none");
    sidebar_click_tag = true;
    show_question_tag = true;
    show_anwser_tag = false;
    highlighted_tag = false;
    toggleSidebar();
    document.getElementById("answer_style").remove();
}

function choose_click() {
    const show_anwser_tag_temp = show_anwser_tag;
    if (show_anwser_tag_temp == false) {
        show_anwser_click();
    }
    let question_index = document.getElementById("choose_number").value;
    if (question_index > questions_back_up.length) {
        alert(`Only ${questions_back_up.length} questions`);
        return;
    }
    let question_window = window.open("", `Question ${question_index - 1}`);
    let question_window_str = `
    <html>
    <head>
        <link rel=stylesheet type="text/css" href="style.css">
    </head>
    <body>
        <div id="questions-container" class="questions-container">
            ${questions_back_up[question_index - 1].innerHTML}
        </div>
    </body>    
    </html>
    `;
    question_window.document.write(question_window_str);
    if (show_anwser_tag_temp == false) {
        show_anwser_click();
    }
}

function export_pdf() {
    let questions_window = window.open("", `ALL Question`);
    let questions_window_str = `
    <html>
    <body>
        <div id="questions-container" class="questions-container">
            ${questions_back_up
                .map((i) => {
                    return i.innerHTML;
                })
                .join()}
        </div>
    </body>    
    </html>
    `;
    questions_window.document.write(questions_window_str);
    questions_window.print();
}

function highlight_aws_service_names() {
    if (highlighted_tag == true) {
        document.getElementsByClassName(
            "card exam-question-card"
        )[0].innerHTML = highlighted_content_backup;
        highlighted_tag = false;
    } else {
        // Replace AWS service names with highlighted versions
        let content = document.getElementsByClassName(
            "card exam-question-card"
        )[0].innerHTML;
        highlighted_content_backup = content;
        let highlighted_content = content.replace(
            highlight_pattern,
            '<strong style="color: red;">$&</strong>'
        );
        document.getElementsByClassName(
            "card exam-question-card"
        )[0].innerHTML = highlighted_content;
        highlighted_tag = true;
    }
}

function showFullScreenGif(gifUrl, duration) {
    let fullScreenElement = document.createElement("div");
    fullScreenElement.style.position = "fixed";
    fullScreenElement.style.top = "0";
    fullScreenElement.style.left = "0";
    fullScreenElement.style.width = "100%";
    fullScreenElement.style.height = "100%";
    fullScreenElement.style.background = "transparent";
    fullScreenElement.style.zIndex = "9999";

    let gifElement = document.createElement("img");
    gifElement.src = gifUrl;
    gifElement.style.objectFit = "contain";
    gifElement.style.width = "200px";
    gifElement.style.height = "200px";
    gifElement.style.margin = "auto";
    gifElement.style.display = "block";
    gifElement.style.position = "absolute";
    gifElement.style.top = "50%";
    gifElement.style.left = "50%";
    gifElement.style.transform = "translate(-50%, -50%)";
    gifElement.style.animation = "moveAround " + duration + "s linear infinite";

    let styleSheet = document.createElement("style");
    styleSheet.innerHTML =
        "@keyframes moveAround { \
                            0% { transform: translate(-50%, -50%); } \
                            25% { transform: translate(-40%, -40%); } \
                            50% { transform: translate(-50%, -50%); } \
                            75% { transform: translate(-60%, -60%); } \
                            100% { transform: translate(-50%, -50%); } \
                          }";
    document.head.appendChild(styleSheet);

    fullScreenElement.appendChild(gifElement);

    document.body.appendChild(fullScreenElement);

    setTimeout(function () {
        document.body.removeChild(fullScreenElement);
    }, duration * 1000);
}

// Function to open the modal
function openModal(modal_type) {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    modal.classList.add("show");
    modal_tag = true;
    document.getElementById("myModalContent").innerHTML = "";
    if (modal_type == "info") {
        document.getElementById("myModalContent").innerHTML = `
            <span class="close" onclick="closeModal()">&times;</span>
			<h3>AWS DVA-C02 Exam Prepare Information</h3>
			<hr />
			<p>List of all topics => "s"</p>
			<p>Random next topic => "q"</p>
			<p>Show answer => "a"</p>
			<p>Reset => "r"</p>
			<p>Display a single topic to a new page (according to topic number) => "c"</p>
			<p>Topic number + 1 => "+"</p>
			<p>Topic number - 1 => "-"</p>
			<p>INFO => "i"</p>
			<p>Highlight AWS Service Keywords => "h"</p>
			<hr />
			<p>Last update: 2023-07-17</p>
        `;
    }
}

// Function to close the modal
function closeModal() {
    let modal = document.getElementById("myModal");
    modal.classList.remove("show");
    modal.style.display = "none";
    modal_tag = false;
}

// Function to close the modal when clicking outside of it
function closeOnOutside(event) {
    if (event.target === document.getElementById("myModal")) {
        closeModal();
    }
}

// Function to toggle the sidebar
function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

document.addEventListener(
    "keypress",
    (event) => {
        let name = event.key;
        if (name == "q") {
            show_question_click();
        } else if (name == "a") {
            show_anwser_click();
        } else if (name == "r") {
            reset_click();
        } else if (name == "c") {
            choose_click();
        } else if (name == "p") {
            export_pdf();
        } else if (name == "h") {
            highlight_aws_service_names();
        } else if (name == "s") {
            toggleSidebar();
        } else if (name == "i") {
            if (modal_tag == false) {
                openModal("info");
            } else {
                closeModal();
            }
        } else if (name == "+") {
            if (
                parseInt(document.getElementById("choose_number").value) <
                questions_back_up.length
            ) {
                document.getElementById("choose_number").value =
                    parseInt(document.getElementById("choose_number").value) +
                    1;
            } else {
                document.getElementById("choose_number").value = 1;
            }
        } else if (name == "-") {
            if (parseInt(document.getElementById("choose_number").value) > 1) {
                document.getElementById("choose_number").value =
                    parseInt(document.getElementById("choose_number").value) -
                    1;
            } else {
                document.getElementById("choose_number").value =
                    questions_back_up.length;
            }
        }
    },
    false
);
