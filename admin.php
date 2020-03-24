<?php
  session_start();
    if ($_SESSION['role'] !== 'admin' || !$_SESSION['isLogged']) {
      header('Location:index.php');
      exit();
    }
?>
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin panel</title>

  <link rel="stylesheet" href="./css/style.min.css">

  <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
</head>
<body class="dark">
  <div class="site">
    <header>
      <div class="header container">
        <h1>E-dziennik</h1>

        <div class="header__user">
          <div class="header__user--info">
            <h5>
              Welcome, <?= $_SESSION['username'] ?>
            </h5>
          </div>
          <div class="header__user--logout">
              <a href="./logout.php">Logout</a>
          </div>
        </div>
      </div>
    </header>


    <section>
      <div class="content container">
        <div id="admin-panel"></div>
      </div>
    </section>
  </div>

  <script src="./webpack-react/dist/main.js"></script>
</body>
</html>