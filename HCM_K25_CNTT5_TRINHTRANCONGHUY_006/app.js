let athletes = [
    { athleteCode: "ATH-001", fullName: "Lâm Văn Hải", sport: "Bóng Đá", age: 21, jerseyNumber: 10 },
    { athleteCode: "ATH-002", fullName: "Tạ Minh Thư", sport: "Bóng Chuyền", age: 19, jerseyNumber: 7 },
    { athleteCode: "ATH-003", fullName: "Đinh Công Phát", sport: "Bóng Đá", age: 24, jerseyNumber: 9 }
];

const validateAthleteCode = (code) => {
    if (code === "") return "Chưa nhập mã vận động viên";
    if (code.length < 6) return "Độ dài nhỏ hơn 6 ký tự";
    if (!code.startsWith("ATH-")) return "Sai tiền tố 'ATH-'";
    if (code.includes(" ")) return "Chứa khoảng trắng";
    if (findAthleteIndex(code) !== -1) return "Mã vận động viên đã tồn tại";
    return "";
};

const findAthleteIndex = (code) => {
    return athletes.findIndex(ath => ath.athleteCode === code);
};

const normalizeText = (rawText) => {
    return rawText
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' '); 
}

const inputIntegerInRange = (message, min, max) => {
    while (true) {
        let input = prompt(message);
        if (input === null){
            return null;
        }
        input = input.trim();
        if (input === "" ){
            console.log("Lỗi: chưa nhập, vui lòng nhập lại");
            continue;
        }
        let num = Number(input);
        if (!Number.isInteger(num)){
            console.log("Lỗi: không phải số nguyên, vui lòng nhập lại");
            continue;
        }
        if (num < min || num > max) {
            console.log("Lỗi: ngoài phạm vi, vui lòng nhập lại");
            continue;
        }
        return num;
    }
};

const displayAthletes = (list) => { 
    if (list.length === 0) {
        console.log("Danh sách vận động viên trống");
        return;
    }

    list.forEach((ath,index) => {
        console.log(`${index + 1}. ${ath.athleteCode} - ${ath.fullName} - ${ath.sport} \n tuổi: ${ath.age} | Số áo: ${ath.jerseyNumber}`);
    });
    console.log(` Tổng: ${list.length} vận động viên`);
};

const handleDisplayAthletes = () => {
    if (athletes.length === 0) {
        console.log("Danh sách vận động viên trống");
        return;
    }
    let sortChoice = prompt("Chọn cách hiển thị:\n1. Thứ tự hiện tại\n2. Sắp xếp theo tuổi tăng dần\n(Nhập 1 hoặc 2. Bấm Cancel để hủy)");

    if (sortChoice === null) return;

    if (sortChoice.trim() === "2"){
        let sortedAthletes = [...athletes].sort((a, b) => a.age - b.age);
        displayAthletes(sortedAthletes);
    } else {
        displayAthletes(athletes);
    }
};

const handleAddAthlete = () => {
    let rawCode = prompt("Nhập mã vận động viên (bắt đầu bằng ATH-):");
    if (rawCode === null) {
        console.log("Hủy thao tác thêm");
        return;
    }
    
    let code = rawCode.trim().toUpperCase();
    let codeError = validateAthleteCode(code);
    if (codeError !== "") {
        console.log(`Lỗi: ${codeError}`);
        return;
    }

    let rawName = "";
    while (true) {
        let inputName = prompt("Nhập họ tên vận động viên:");
        if (inputName === null) {
            console.log("Hủy thao tác thêm");
            return;
        }
        if (inputName.trim() === "") {
            console.log("Lỗi: Họ tên không được rỗng, vui lòng nhập lại!");
            continue;
        }
        rawName = inputName;
        break;
    }
    let fullName = normalizeText(rawName);

    let rawSport = "";
    while (true) {
        let inputSport = prompt("Nhập môn thi đấu:");
        if (inputSport === null) {
            console.log("Hủy thao tác thêm");
            return;
        }
        if (inputSport.trim() === "") {
            console.log("Lỗi: Môn thi đấu không được rỗng, vui lòng nhập lại!");
            continue;
        }
        rawSport = inputSport;
        break;
    }
    let sport = normalizeText(rawSport);

    let age = inputIntegerInRange("Nhập tuổi (15 - 40):", 15, 40);
    if (age === null) {
        console.log("Hủy thao tác thêm");
        return;
    }

    let jerseyNumber = inputIntegerInRange("Nhập số áo (1 - 99):", 1, 99);
    if (jerseyNumber === null) {
        console.log("Hủy thao tác thêm");
        return;
    }

    const newAthlete = {
        athleteCode: code,
        fullName: fullName,
        sport: sport,
        age: age,
        jerseyNumber: jerseyNumber
    };
    
    athletes.push(newAthlete);
    
    console.log("Đã thêm thành công vận động viên:");
    displayAthletes([newAthlete]);
};

const handleUpdateAthlete = () => {
    let rawCode = prompt("Nhập mã vận động viên cần cập nhật:");
    if (rawCode === null) return;
    
    let code = rawCode.trim().toUpperCase();
    let index = findAthleteIndex(code);
    
    if (index === -1) {
        console.log(`Không tìm thấy vận động viên có mã ${code}`);
        return;
    }

    let oldAge = athletes[index].age;
    let oldJersey = athletes[index].jerseyNumber;

    let newAge = inputIntegerInRange(`Nhập tuổi mới (15 - 40) [hiện tại: ${oldAge}]:`, 15, 40);
    if (newAge === null) {
        console.log("Bấm Cancel – đã hủy cập nhật");
        return;
    }

    let newJersey = inputIntegerInRange(`Nhập số áo mới (1 - 99) [hiện tại: ${oldJersey}]:`, 1, 99);
    if (newJersey === null) {
        console.log("Bấm Cancel – đã hủy cập nhật");
        return;
    }

    athletes[index].age = newAge;
    athletes[index].jerseyNumber = newJersey;
    
    console.log(`Cập nhật thành công. Trước: Tuổi ${oldAge} / Số áo ${oldJersey} | Sau: Tuổi ${athletes[index].age} / Số áo ${athletes[index].jerseyNumber}`);
};

const handleDeleteAthlete = () => {
    let rawCode = prompt("Nhập mã vận động viên cần xóa:");
    if (rawCode === null) return;
    
    let code = rawCode.trim().toUpperCase();
    let index = findAthleteIndex(code);
    
    if (index === -1) {
        console.log(`Không tìm thấy vận động viên có mã ${code}`);
        return;
    }

    let confirm = prompt(`Bạn có chắc chắn muốn xóa vận động viên ${code}? (Y/N)`);
    if (confirm !== null && confirm.trim().toLowerCase() === 'y') {
        athletes.splice(index, 1);
        console.log(`Xóa thành công, còn ${athletes.length} vận động viên`);
    } else {
        console.log(`Đã hủy thao tác xóa, còn ${athletes.length} vận động viên`);
    }
};

const handleSearchAthlete = () => {
    let keyword = prompt("Nhập môn thi đấu cần tìm kiếm:");
    
    if (keyword === null || keyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }
    
    keyword = keyword.trim().toLowerCase();
    
    const results = athletes.filter(ath => ath.sport.toLowerCase().includes(keyword));
    
    if (results.length === 0) {
        console.log("Không tìm thấy vận động viên phù hợp");
    } else {
        console.log(`Tìm thấy ${results.length} vận động viên:`);
        displayAthletes(results);
    }
};

const displaySummaryReport = () => {
    if (athletes.length === 0) {
        console.log("Chưa có vận động viên nào");
        return;
    }

    let totalAge = 0;
    let oldestAthlete = athletes[0];

    athletes.forEach(ath => {
        totalAge += ath.age;
        if (ath.age > oldestAthlete.age) {
            oldestAthlete = ath;
        }
    });

    let avgAge = (totalAge / athletes.length).toFixed(1);
    console.log("=================================");
    console.log("BÁO CÁO TỔNG KẾT VẬN ĐỘNG VIÊN");
    console.log("=================================");
    console.log(`Tổng số vận động viên: ${athletes.length}`);
    console.log(`Tuổi trung bình: ${avgAge}`);
    console.log(`Vận động viên lớn tuổi nhất: ${oldestAthlete.athleteCode} ${oldestAthlete.fullName} ${oldestAthlete.age}`);
    console.log("=================================");
}

const startProgram = () =>{
    const menuString = `
    ==========================================
    HỆ THỐNG QUẢN LÝ CLB THỂ THAO VICTORY 
    ==========================================
    1.Hiển thị danh sách vận động viên
    2.Thêm vận động viên mới 
    3.Cập nhật thông tin vận động viên
    4.Xóa vận động viên 
    5.Tìm kiếm vận động viên theo môn thi đấu
    0.Thoát chương trình 
    =========================================
    Vui lòng nhập lựa chọn của bạn(0-5):`;
    while (true) {
        let choice = prompt(menuString);
        if (choice === null) {
            console.log("lựa chọn không hợp lệ vui lòng chọn từ 0 đến 5.");
            continue;
        }
        choice = choice.trim();
        switch (choice) {
            case "1":
                handleDisplayAthletes();
                break;
            case "2":
                handleAddAthlete();
                break;
            case "3":
                handleUpdateAthlete();
                break;
            case "4":
                handleDeleteAthlete();
                break;
            case "5":
                handleSearchAthlete();
                break;
            case "0":
                displaySummaryReport();
                console.log("Cảm ơn đã sử dụng chương trình, Tạm biệt!");
                return; 
            default:
                console.log("lựa chọn ngoài 0-5, vui lòng chọn lại!")
                break;
        }
        
    }
}
startProgram();