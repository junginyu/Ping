//profile.js
document.addEventListener("DOMContentLoaded", function () {
    const profileImage = localStorage.getItem("profile_image");
    const nickname = localStorage.getItem("nickname");

    document.getElementById("profile-image").src = profileImage || "media/default-profile.svg";
    document.getElementById("nickname-input").value = nickname || "";

    document.getElementById("save-button").disabled = true;

    ["nickname-input", "country-select"].forEach((id) => {
        document.getElementById(id).addEventListener("change", () => {
            document.getElementById("save-button").disabled = false;
        });
    });

    window.saveProfile = function () {
        const newNickname = document.getElementById("nickname-input").value;
        const newCountry = document.getElementById("country-select").value;

        // 서버에 프로필 업데이트 요청하거나 로컬 스토리지에 저장
        localStorage.setItem("nickname", newNickname);
        localStorage.setItem("country", newCountry);
        alert("프로필이 저장되었습니다.");
        document.getElementById("save-button").disabled = true;
    };

    window.logout = function () {
        Kakao.Auth.logout(function () {
            localStorage.clear();
            window.location.href = "../index.html";
        });
    };

    // 이미지 파일을 선택 시 실행
    function previewImage(input) {
        console.log("Input file changed", input.files);
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log("File read complete", e.target.result);
                document.getElementById("profile-image").src = e.target.result;
                localStorage.setItem("profile_image", e.target.result);
            };
            reader.onerror = function (error) {
                console.error("FileReader error:", error);
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            console.log("No file selected or file access error");
        }
    }

    // 이미지 업로드 요소에 대한 이벤트 리스너 추가
    const imageInput = document.getElementById("image-upload");
    if (imageInput) {
        console.log("Adding event listener to image input.");
        imageInput.addEventListener("change", function (event) {
            console.log("File selected:", event.target.files);
            if (event.target.files.length > 0) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    console.log("File read:", e.target.result);
                    document.getElementById("profile-image").src = e.target.result;
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        });
    } else {
        console.log("Image input element not found.");
    }
});
