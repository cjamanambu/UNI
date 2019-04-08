import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateActivity from '../components/pages/CreateActivity';
import ViewActivityModal from '../components/pages/ViewActivityModal';
import SortActivityModal from '../components/pages/SortActivityModal';
import Sidebar from '../components/pages/Sidebar';
import {Modal, Button} from "semantic-ui-react";

Enzyme.configure({adapter: new Adapter()});

describe('CreateActivity', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<CreateActivity/>);
    });
    it('CreateActivity Component showing', () => {
        expect(wrapper.exists()).toBe(true);
    });
    it('CreateActivity show correct number of Modal ', () => {
        wrapper.setState({showConfirmation: false, show: true});
        wrapper.render();
        expect(wrapper.find("Modal")).toHaveLength(2);
    });
    it('CreateActivity show correct number of input field ', () => {
        wrapper.setState({showConfirmation: false, show: true});
        expect(wrapper.find("input")).toHaveLength(4);
    });
    it('CreateActivity show correct number of dropdown  ', () => {
        wrapper.setState({showConfirmation: false, show: true});
        expect(wrapper.find("Dropdown")).toHaveLength(2);
    });
    it('CreateActivity show correct input in success confirmation modal  ', () => {
        wrapper.setState({showConfirmation: false, show: true});
        expect(wrapper.find("Modal").at(0).render().find("input")).toHaveLength(0);
    });
    it('CreateActivity show correct input in creation modal  ', () => {
        wrapper.setState({showConfirmation: false, show: true});
        expect(wrapper.find("Modal").at(1).render().find("input")).toHaveLength(4);
    });
});

describe('ViewActivityModal', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<ViewActivityModal/>);
    });
    it('ViewActivityModal Component showing', () => {
        expect(wrapper.exists()).toBe(true);
    });
    it('ViewActivityModal Component showing all possible activities and close button ', () => {
        expect(wrapper.find('Button')).toHaveLength(4);
    });
});

describe('SortActivityModal', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<SortActivityModal/>);
    });
    it('SortActivityModal Component showing', () => {
        expect(wrapper.exists()).toBe(true);
    });
    it('SortActivityModal Component showing all possible activities and close button', () => {
        expect(wrapper.find('Button')).toHaveLength(6);
    });
});

describe('Sidebar', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Sidebar/>);
    });
    it('Sidebar Component showing', () => {
        expect(wrapper.exists()).toBe(true);
    });
    it('Sidebar Component showing all fuctionality', () => {
        expect(wrapper.find('Button')).toHaveLength(4);
    });


    const puppeteer = require('puppeteer');

    const person = {
        email: "s@myumanitoba.ca",
        password: "s",
    };

    describe('System test', () => {
        it('Login in', async () => {
            let browser = await puppeteer.launch({
                headless: false,
                slowMo: 50
            });
            let page = await browser.newPage();

            page.emulate({
                viewport: {
                    width: 1300,
                    height: 600
                },
                userAgent: ''
            });

            await page.goto('http://localhost:3000/');
            await page.click("input[name=Email]");
            await page.type("input[name=Email]", person.email);
            await page.click("input[name=password]");
            await page.type("input[name=password]", person.password);
            await page.click("button[type=button]");

            browser.close();
        }, 20000);
    });
});