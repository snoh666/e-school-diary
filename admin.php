<?php
  session_start();
    if (!$_SESSION['isAdmin'] || !$_SESSION['isLogged']) {
      header('Location:index.php');
      exit();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin panel</title>

  <link rel="stylesheet" href="./css/style.min.css">

  <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
</head>
<body>
  <div class="site">
    <h1>Witaj administratorze</h1>
  </div>
</body>
</html>