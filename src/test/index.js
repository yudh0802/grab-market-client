import React, { useEffect } from 'react';

function TestComponent() {
    const [name, setName] = React.useState('다마');
    console.log('Component 업데이트!');
    var testname = '';
    React.useEffect(function () {
        setTimeout(() => {
            console.log('1초 뒤에 나온다');
            testname = '다마고치';
            setName(testname);
        }, 1000);
    }, []);

    return <p>테스트 {name} </p>;
}

export default TestComponent;
