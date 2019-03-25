import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateActivity from '../components/pages/CreateActivity';
import ViewActivityModal from '../components/pages/ViewActivityModal';
import {Modal} from "semantic-ui-react";
Enzyme.configure({ adapter: new Adapter() });

describe('CreateActivity', ()=>{
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<CreateActivity />);
    });
    it('CreateActivity Component showing',()=>{
        expect(wrapper.exists()).toBe(true);
    });
    it('CreateActivity show correct number of Modal ',()=>{
        wrapper.setState({showConfirmation: false,show:true});
        wrapper.render();
        expect(wrapper.find("Modal")).toHaveLength(2);
    });
    it('CreateActivity show correct number of input field ',()=>{
        wrapper.setState({showConfirmation: false,show:true});
        expect(wrapper.find("input")).toHaveLength(4);

    });
    it('CreateActivity show correct number of dropdown  ',()=>{
        wrapper.setState({showConfirmation: false,show:true});
        expect(wrapper.find("Dropdown")).toHaveLength(2);
    });
    it('CreateActivity show correct input in success confirmation modal  ',()=>{
        wrapper.setState({showConfirmation: false,show:true});
        expect(wrapper.find("Modal").at(0).render().find("input")).toHaveLength(0);
    });
    it('CreateActivity show correct input in creation modal  ',()=>{
        wrapper.setState({showConfirmation: false,show:true});
        expect(wrapper.find("Modal").at(1).render().find("input")).toHaveLength(4);
    });
});

describe('ViewActivityModal', ()=>{
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<ViewActivityModal/>);
    });
    it('ViewActivityModal Component showing',()=>{
        expect(wrapper.exists()).toBe(true);
    });
});