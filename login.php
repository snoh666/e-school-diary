<?php
  session_start();

  if (isset($_POST['username'])) {
    if (empty($_POST['username']) || empty($_POST['passwd'])) {
      header('Location:index.php');
      exit();
    }

    require_once('connect.php');

    if ($conn->connect_errno != 0) {
      echo 'Databse error'.$conn->connect_errno;
    } else {
      $sql = 'SELECT * FROM users WHERE username="'.$_POST['username'].'" AND password="'.md5($_POST['passwd']).'"';
      $response = $conn->query($sql);

      if (mysqli_num_rows($response) == 0) {
        header('Location:index.php');
        exit();
      } else {
        // I suppose there is no user with the same username
        $row = $response->fetch_assoc();
        $_SESSION['isLogged'] = true;
        $_SESSION['isAdmin'] = $row['role'] == 'admin' ? true : false;
      }
    }
  }
?>