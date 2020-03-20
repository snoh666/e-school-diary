<?php
  session_start();

  if (isset($_SESSION['isLogged'])) {
    if ($_SESSION['isAdmin']) {
      header('Location:admin.php');
      exit();
    }
    header('user.php');
    exit();
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-dziennik - mvp</title>

  <link rel="stylesheet" href="./css/style.min.css">

  <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
</head>
<body>
  <div class="site">
    <div class="flex__center--single login--form__wrapper">
      <form action="./login.php" method="post" class="login--form">
        <label for="username">
          <span>Username</span>
          <input type="text" name="username" id="username">
        </label>
        <label for="passwd">
          <span>Password</span>
          <input type="password" name="passwd" id="passwd">
        </label>
        <div class="form__wrapper--button">
          <button type="submit"><span>Login</span></button>
        </div>
      </form>
    </div>
  </div>
</body>
</html>