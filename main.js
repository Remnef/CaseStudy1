var ad = false;
var mes=[];
const UserName = 'remnef';
const Password = 123;
var Drinks = function (name, define, cost, imgagePath) {
    this.Name = name;
    this.define = define;
    this.cost = cost;
    this.imagePath = imgagePath
}
var drinks = [], drink_ = [];
let Ice_blend = new Drinks('Ice Blend', 'Thức uống đá xay', 45.000, './css/img/ice-blended.jpg');
let Espresso = new Drinks('Espresso', 'Cà phê pha máy', 18.000, './css/img/espresso.jpg');
let Smoothies = new Drinks('Smoothies', 'Đá xay sữa chua', 40.000, './css/img/smoothie.jpg');
let Tea = new Drinks('Tea', 'Trà', 30.000, './css/img/tea.jpg');
drink_.push(Ice_blend);
drink_.push(Espresso);
drink_.push(Smoothies);
drink_.push(Tea);
function check(str) {
    for (let i = 0; i < drinks.length; i++) {
        let checked = drinks[i].Name;
        if ((str == checked) || (str == '')) {
            return false;
        }
    }
    return true;
}
function addProduct() {
    let name = document.getElementById("drink_name").value;
    name = convert_str(name);
    if (check(name)) {
        let define = document.getElementById("define").value;
        let cost = +document.getElementById("cost").value;
        let img = document.getElementById('img').value;
        let product = {
            'Name': name,
            'define': define,
            'cost': cost,
            'imagePath':img
        }
        drinks.push(product);
        reset();
        showProduct();
        check_user();
        set_item("DS-san_pham", drinks);
    }
    else { confirm('Input again !'); }

}
function showProduct() {
    document.getElementById('drink').innerHTML = `${drinks.length} Món`
    document.getElementById('result').innerHTML = ''
    for (let i = 0; i < drinks.length; i++) {
        document.getElementById('result').innerHTML += `<tr id="tr_${i}">
                <td><img src='${drinks[i].imagePath}' width="120px" height="120px"></td>
                <td>${drinks[i].Name}</td>
                <td>${drinks[i].define}</td>
                <td>${drinks[i].cost}VND</td>
                <td class='d-none'>
                <button class="btn btn-success" onclick="edit(${i})">Edit</button>
                <button class="btn btn-success d-none" onclick="update(${i})">Update</button>
                <button class="btn btn-danger d-none" onclick="cancel(${i})">Cancel</button>
                <button class="btn btn-danger" onclick="remove(${i})">Remove</button>
                </td>
            </tr>`
    }
}
function reset() {
    document.getElementById("drink_name").value = "";
    document.getElementById("define").value = '';
    document.getElementById("cost").value = '';
}
function set_item(key, data) {
    data.sort();
    window.localStorage.setItem(key, JSON.stringify(data));
}
function get_item() {
    drinks = JSON.parse(window.localStorage.getItem("DS-san_pham"))

}
function init() {
    if ((window.localStorage.getItem('DS-san_pham') == null)) {
        drinks = drink_;
        set_item('DS-san_pham', drinks);
    }
    else {
        get_item();
    }
}
function start() {
    init();
    showProduct();

}
function check_user() {
    let user = document.getElementById('user').value;
    let pw = document.getElementById('pw').value;
    if ((user == UserName) & (pw == Password)) { ad = true }
    admin(ad);
}
function sign_out() {
    ad = false;
    admin(ad);
}
function admin(check) {
    if (check) {
        let kt1 = document.getElementById('add');
        let kt2 = document.getElementById('signing');
        let kt3 = document.getElementById('sign_in');
        let kt4 = document.getElementById('drink');
        let kt5 = document.getElementById('contact');
        kt1.classList.remove("d-none");
        kt2.classList.remove("d-none");
        kt3.classList.add("d-none");
        kt4.classList.remove('d-none');
        kt5.classList.add('d-none');
        for (let i = 0; i < drinks.length; i++) {
            let tr = document.getElementById(`tr_${i}`);
            tds = tr.children;
            tds[4].classList.remove('d-none');
        }
        if((window.localStorage.getItem('thong_bao') !== null)){
            mes = JSON.parse(window.localStorage.getItem("thong_bao"))
            confirm(`Bạn có ${mes.length} thông báo`)
            for (let i=0;i<mes.length;i++){
                confirm(`Tên :${mes[i].name}
                \nEmail: ${mes[i].email}
                \nSĐT: ${mes[i].number}
                \nLời nhắn: ${mes[i].message}`);
            }
            mes=[];
            set_item('thong_bao',mes);
        }
    }
    else {
        let kt1 = document.getElementById('add');
        let kt2 = document.getElementById('signing');
        let kt3 = document.getElementById('sign_in');
        let kt4 = document.getElementById('drink');
        let kt5 = document.getElementById('contact');
        kt1.classList.add("d-none");
        kt2.classList.add("d-none");
        kt3.classList.remove("d-none");
        kt4.classList.add('d-none');
        kt5.classList.remove("d-none");
        for (let i = 0; i < drinks.length; i++) {
            let tr = document.getElementById(`tr_${i}`);
            tds = tr.children;
            tds[4].classList.add('d-none');
        }
    }
}
function convert_str(str) {
    return str.trim().replace('  ', ' ');
}
function remove(id) {
    let check = window.confirm('Are you sure ?');
    if (check) {
        drinks.splice(id, 1);
        set_item("DS-san_pham", drinks);
        get_item();
        showProduct();
        check_user();
    }
}
function edit(id) {
    let tr = document.getElementById(`tr_${id}`);
    let tds = tr.children;
    tds[1].innerHTML = `<input class="row input" type="text" value="${drinks[id].Name}">`
    tds[2].innerHTML = `<input class="row input" type="text" value="${drinks[id].define}">`
    tds[3].innerHTML = `<input class="row input" type="number" value="${drinks[id].cost}">`
    tds[4].children[0].classList.add('d-none');
    tds[4].children[1].classList.remove('d-none');
    tds[4].children[2].classList.remove('d-none');
}
function update(id) {
    let tr = document.getElementById(`tr_${id}`);
    let tds = tr.children;
    let NewName = tds[1].children[0].value;
    let Newdefine = tds[2].children[0].value;
    let Newcost = +tds[3].children[0].value;
    NewName = convert_str(NewName);
    if ((check(NewName)) || (NewName == drinks[id].Name)) {
        drinks[id].Name = NewName;
        drinks[id].define = Newdefine;
        drinks[id].cost = Newcost;
        set_item('DS-san_pham', drinks);
        cancel(id);
    } else { alert('Input again !!!') }
}
function cancel(id) {
    document.getElementById(`tr_${id}`).innerHTML = '';
    document.getElementById(`tr_${id}`).innerHTML += `<tr id="tr_${id}">
        <td><img src='${drinks[i].imagePath}' width="120px" height="120px"></td>
        <td>${drinks[id].Name}</td>
        <td>${drinks[id].define}</td>
        <td>${drinks[id].cost}VND</td>
        <td>
        <button class="btn btn-success" onclick="edit(${id})">Edit</button>
        <button class="btn btn-success d-none" onclick="update(${id})">Update</button>
        <button class="btn btn-danger d-none" onclick="cancel(${id})">Cancel</button>
        <button class="btn btn-danger" onclick="remove(${id})">Remove</button>
        </td>
    </tr>`;
}
function get_(){
    let name= document.getElementById('name_').value;
    let email= document.getElementById('email_').value;
    let phone= document.getElementById('phone_').value;
    let message= document.getElementById('message_').value;
    let mess={
        'name':name,
        'email':email,
        'number':phone,
        'message':message
    }
    document.getElementById('name_').value='';
    document.getElementById('email_').value='';
    document.getElementById('phone_').value='';
    document.getElementById('message_').value='';
    mes.push(mess);
    set_item('thong_bao',mes);
}
start();