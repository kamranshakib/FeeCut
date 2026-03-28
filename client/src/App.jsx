import { useState } from "react";
import axios from "axios";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/students",
        formData
      );

      console.log(res.data);

      alert("درخواست شما ثبت شد ");

      // ریست فرم
      setFormData({
        id: "",
        name: "",
        lastName: "",
        fatherName: "",
        school: "",
        province: "",
        examType: "",
        time: ""
      });

    } catch (err) {
      console.error(err);
      alert("خطا در ارسال ");
    }
  };

  return (
    <div className="page">
      <div className="card">

        <h2>فرم درخواست تخفیف امتحان</h2>

        <form onSubmit={handleSubmit}>

          <div className="formGrid">

            <div className="inputBox">
              <input name="id" value={formData.id} onChange={handleChange} required placeholder=" " />
              <label>آیدی</label>
            </div>

            <div className="inputBox">
              <input name="name" value={formData.name} onChange={handleChange} required placeholder=" " />
              <label>نام</label>
            </div>

            <div className="inputBox">
              <input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder=" " />
              <label>تخلص</label>
            </div>

            <div className="inputBox">
              <input name="fatherName" value={formData.fatherName} onChange={handleChange} required placeholder=" " />
              <label>نام پدر</label>
            </div>

            <div className="inputBox">
              <input name="school" value={formData.school} onChange={handleChange} required placeholder=" " />
              <label>مکتب</label>
            </div>

            <div className="inputBox">
              <input name="province" value={formData.province} onChange={handleChange} required placeholder=" " />
              <label>ولایت</label>
            </div>

            <div className="inputBox">
              <select name="examType" value={formData.examType} onChange={handleChange} required>
                <option value=""></option>
                <option>تخفیف پیشگام</option>
                <option>تخفیف کانکوری</option>
                <option>تخفیف تطبیقات</option>
              </select>
              <label>نوع امتحان</label>
            </div>

            <div className="inputBox">
              <select name="time" value={formData.time} onChange={handleChange} required>
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