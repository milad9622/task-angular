<?php
    header('Content-Type: text/html; charset=utf-8');

    include('admin/config.php');
    if(!$con) {
        exit(json_encode(array("status" => false, "message" => 'noConnect', "data" => [])));
    }
    
    $data = json_decode(file_get_contents('php://input'));

    //register user
    if(isset($_GET['register'])) {
        
        $result = mysqli_query($con, "select * from users2 where email='".$data->email."'");

        if(mysqli_num_rows($result)) { //there is a email with same name
            exit(json_encode(array("status" => false, "message" => 'isEmail', "data" => $data->email)));
        }

        $random = rand(1000,10000);
        
        $result = mysqli_query($con, "insert into users2 (name, email, password, active, temppass) values('".$data->name."', '".$data->email."', '".md5($data->password)."', '2', '".$random."')");

        sendMail($random, $data->email);

        exit(json_encode(array("status" => true, "message" => 'success', "data" => $data)));
    }
    
    //verify link
    if(isset($_GET['verify'])) {
        $result = mysqli_query($con, "select * from users2 where temppass='".$_GET['verify']."' limit 1");
        if(mysqli_num_rows($result)) { //if link is true
            $row = mysqli_fetch_assoc($result);
            $user = array("name"=> $row['name'], "email"=> $row['email']);
            mysqli_query($con, 'update users2 set active="1" where temppass="'.$_GET['verify'].'"');

            exit(json_encode(array("status" => true, "message" => 'valid', "data" => $user)));
        }
        exit(json_encode(array("status" => false, "message" => 'Invalid', "data" => [])));
    }

    //login
    if(isset($_GET['login'])) {
        $result = mysqli_query($con, "select * from users2 where email='". $data->email ."' and password='". md5($data->password) ."' limit 1");
        if(mysqli_num_rows($result)) { //if this is a current email
            $row = mysqli_fetch_assoc($result);
            $user = array("name"=> $row['name'], "email"=> $row['email']);
            if($row['active'] == 2) { //if user did not verify his account
                exit(json_encode(array("status" => false, "message" => 'email invalid', "data" => [])));
            }elseif($row['active'] == 0) { //if admin did passive user
                exit(json_encode(array("status" => false, "message" => 'user invalid', "data" => [])));
            }
            exit(json_encode(array("status" => true, "message" => 'valid', "data" => $user)));
        }
        exit(json_encode(array("status" => false, "message" => 'Invalid', "data" => [])));
    }
    
    //get list of users
    if(isset($_GET['users'])) {
        $result = mysqli_query($con, "select * from users2");
        $users = array();
        while($row = mysqli_fetch_assoc($result)) {
            array_push($users, $row);
        }
        exit(json_encode(array("status" => true, "message" => 'success', "data" => $users)));
    }
    
    //delete user
    if(isset($_GET['delete'])) {
        mysqli_query($con, "delete from users2 where id='".$_GET['delete']."'");
        
        $result = mysqli_query($con, "select * from users2");
        $users = array();
        while($row = mysqli_fetch_assoc($result)) {
            array_push($users, $row);
        }
        exit(json_encode(array("status" => true, "message" => 'success', "data" => $users)));
    }
    
    //active user
    if(isset($_GET['act'])) {
        mysqli_query($con, "update users2 set active='1' where id='".$_GET['act']."'");
        
        $result = mysqli_query($con, "select * from users2");
        $users = array();
        while($row = mysqli_fetch_assoc($result)) {
            array_push($users, $row);
        }
        exit(json_encode(array("status" => true, "message" => 'success', "data" => $users)));
    }
    
    //passive user
    if(isset($_GET['deact'])) {
        mysqli_query($con, "update users2 set active='0' where id='".$_GET['deact']."'");
        
        $result = mysqli_query($con, "select * from users2");
        $users = array();
        while($row = mysqli_fetch_assoc($result)) {
            array_push($users, $row);
        }
        exit(json_encode(array("status" => true, "message" => 'success', "data" => $users)));
    }

    //sending email
    function sendMail($rand, $email) { 
        $whom = $email; // email address where the contact form data will be sent
        $subject = "Verify Email | task-angular";

        $comment =  "برای تایید ایمیل روی لینک زیر کلیک کنید: \r\n <a href='http://localhost:4200/verify?code=$rand'>http://localhost:4200/verify?code=$rand</a>";

        $headers = "MIME-Version: 1.0 \r\n";
        $headers .= "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: task-angular<info@minotes.ir> \r\n";

        $success = mail($whom,$subject,$comment, $headers); // this is the email function
        if (!$success) {
            // var_dump($success);
            // echo "1";
        }
    }
?>