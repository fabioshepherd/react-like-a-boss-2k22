import renderer from 'react-test-renderer';
it('Hover Test', () => {
    const component = renderer.create(
     <span id='firstSpan' onClick={() => {console.log("test2")}}> TEST </span>
      );

      let json = component.toJSON();
      expect(json).toMatchSnapshot();

      renderer.act(() => {
        json.props.onClick();
      }); 

      json = component.toJSON();
      expect(json).toMatchSnapshot();
});