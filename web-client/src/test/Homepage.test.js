import React from 'react';
import Enzyme, {shallow,mount}from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {HomePage, LoginBox, RegisterBox} from '../components/pages/HomePage';
import {HomePageHelper} from "../helper/HomePageHelper"
Enzyme.configure({ adapter: new Adapter() });

describe('Homepage', ()=>{
    it('HomePage Component showing',()=>{
        const wrapper = shallow(<HomePage/>);
        wrapper.setState({isLoginOpen: false,
            isRegisterOpen: false});
        expect(wrapper.exists()).toBe(true);
    });

    it('Login Component showing',()=>{
        const wrapper = mount(<HomePage/>);
        wrapper.setState({isLoginOpen: true,
            isRegisterOpen: false});
        expect(wrapper.contains(<LoginBox />)).toBe(true);
    });
    it('Register Component showing',()=>{
        const wrapper = shallow(<HomePage/>);
        wrapper.setState({isLoginOpen: false,
            isRegisterOpen: true});
        expect(wrapper.contains(<RegisterBox showLogin={wrapper.instance().showLoginBox}/>)).toBe(true);
    });
    it('login should contain 2 input box',()=>{
        const wrapper1 = shallow(<LoginBox/>);
        expect(wrapper1.find("input")).toHaveLength(2);

    });
    it('Register should contain 2 input box',()=>{
        const wrapper = shallow(<HomePage/>);
        const wrapper1 = shallow(<RegisterBox showLogin={wrapper.instance().showLoginBox}/>);
        expect(wrapper1.find("input")).toHaveLength(2);

    });
    it('should validate empty email ', function () {
        expect(HomePageHelper.validateEmail("")).toBe("Email field cannot be empty!")
    });
    it('should validate non @myumanitoba.ca email ', function () {
        expect(HomePageHelper.validateEmail("a@gmail.ca")).toBe("Email must be a valid @myumaitoba.ca email")
    });
    it('should validate @myumanitoba.ca email ', function () {
        expect(HomePageHelper.validateEmail("a@myumanitoba.ca")).toBe("")
    });
    it('should validate empty password ', function () {
        expect(HomePageHelper.validatePassword("")).toBe("Password field cannot be empty!")
    });
    it('should validate any non empty password ', function () {
        expect(HomePageHelper.validatePassword("skokolokobangoshe")).toBe("")
    });
});