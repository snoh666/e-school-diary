<?php
  session_start();

  if (isset($_SESSION['isLogged'])) {
    if ($_SESSION['role'] == 'admin') {
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
<body class="dark">
  <div class="site">
    <div class="flex__center--single login--form__wrapper">
      <form action="./login.php" method="post" class="login--form fade-up" style="transition-delay: .5s;">
        <label for="username">
          <span>Username</span>
          <input type="text" name="username" id="username">
        </label>
        <label for="passwd">
          <span>Password</span>
          <input type="password" name="passwd" id="passwd">
        </label>
        <div class="form__wrapper--button">
          <button type="submit" class="squaredBorder"><span>Login</span></button>
        </div>
      </form>
      <?php
        if (isset($_SESSION['login_error'])) :
          if (!empty($_SESSION['login_error'])) :
      ?>
        <p class="message--error">
          <?= $_SESSION['login_error'] ?>
        </p>
      <?php
          endif;
        endif;
      ?>
    </div>
  </div>
  <script src="./webpack-js/dist/bundle.js"></script>
</body>
</html>