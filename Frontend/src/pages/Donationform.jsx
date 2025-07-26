import React from 'react';

const Donationform = () => {
  return <>
    <img src='./images/iii.jpeg' className='bgimg1'/>
    <div className="container">
    <form>
        <label className='label' for="fname">Full Name</label>
            <input type="text" id="fname" name="fullname" placeholder="Your fullname.."/><br/>
        <label className='label'for="city">City</label>
        <select id="city" name="city">
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
        </select>
        <br/>
        <label className='label' for="Email">Email</label>
            <input type="text" id="email" name="Email" placeholder="Your email.."/> <br/>
        <label className='label' for="Address">Address</label>
            <input type="text" id="address" name="Address" placeholder="Your address.."/><br/>
        <label className='label' for="Phone">Phone No</label>
            <input type="number" id="phone" name="phone" placeholder="Your phone.."/><br/>
        <label className='label' for="Amount">Amount</label>
            <select id="Amount" name="Amount">
                <option value="100">RS 100</option>
                <option value="500">RS 500</option>
                <option value="1000">RS 1000</option>
            </select>
            <input type="submit" value="Submit"/>
    </form>
</div>
 </>
};
export default Donationform;