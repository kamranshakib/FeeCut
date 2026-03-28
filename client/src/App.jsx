import { useState } from "react";
import "./App.css";

export default function App() {

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    fatherName: "",
    school: "",
    province: "",
    examType: "",
    time: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("درخواست شما ثبت شد");
  };

  return (
    <div className="page">
      <div className="card">

        <h2>فرم درخواست تخفیف امتحان</h2>

        <form onSubmit={handleSubmit}>

          <div className="formGrid">

            <div className="inputBox">
              <input name="id" onChange={handleChange} required placeholder=" " />
              <label>آیدی</label>
            </div>

            <div className="inputBox">
              <input name="name" onChange={handleChange} required placeholder=" " />
              <label>نام</label>
            </div>

            <div className="inputBox">
              <input name="lastName" onChange={handleChange} required placeholder=" " />
              <label>تخلص</label>
            </div>

            <div className="inputBox">
              <input name="fatherName" onChange={handleChange} required placeholder=" " />
              <label>نام پدر</label>
            </div>

            <div className="inputBox">
              <input name="school" onChange={handleChange} required placeholder=" " />
              <label>مکتب</label>
            </div>

            <div className="inputBox">
              <input name="province" onChange={handleChange} required placeholder=" " />
              <label>ولایت</label>
            </div>

            <div className="inputBox">
              <select name="examType" onChange={handleChange} required>
                <option value=""></option>
                <option>تخفیف پیشگام</option>
                <option>تخفیف کانکوری</option>
                <option>تخفیف تطبیقات</option>
              </select>
              <label>نوع امتحان</label>
            </div>

            <div className="inputBox">
              <select name="time" onChange={handleChange} required>
                <option value=""></option>
                <option>قبل از ظهر</option>
                <option>بعد از ظهر</option>
              </select>
              <label>تایم</label>
            </div>

          </div>

          <button type="submit">ثبت درخواست</button>

        </form>

      </div>
    </div>
  );
}