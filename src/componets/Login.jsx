import React ,{useState} from 'react';
import { Button, Checkbox, Form, Input , notification} from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [login, setLogin] = useState();
    const [pass, setPass] = useState();
    const [status , setStaus] = useState(false)
    const navigate = useNavigate()
   function run(){
    setStaus(true)
    fetch(`https://toko.ox-sys.com/security/auth_check`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded' ,
            'Accept': 'application/json' 
        },
        body: `_username=${login}&_password=${pass}&_subdomain=toko`
        
    })
    .then(res =>{
        if(res.ok) {
            return res.json();
        } else {
            throw new Error('Xatolik yuz berdi');
        }
    })
    .then(data => {
        const token = data.token;
        localStorage.setItem('token', token)
        navigate('/main')
        setStaus(!status)
    })
    .catch(e =>{
        console.log(e);
        openNotificationWithIcon('error')
        setStaus(false)
    })
    
   }

   // notification
  
   const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Hato ',
      description:
        'login yoki parol hato',
    });
  };
        
    
    
    return (
        <div>
            <div style={{display:'flex' , justifyContent:"center" , alignItems:'center' , height:'100vh'}}>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                
                autoComplete="off"
            >
                <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                    required: true,
                    message: 'Please input your username!',
                    },
                ]}
                >
                <Input  onChange={(e)=>{setLogin(e.target.value)}}/>
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
                >
                <Input.Password  onChange={(e)=>{setPass(e.target.value)}}/>
                </Form.Item>

                <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit" onClick={run}>
                   {
                    (status) ? ' Loading...' : 'Submit'
                    
                   }
                </Button>
                </Form.Item>
            </Form> 
            </div>
        </div>
    );
}

export default Login;
