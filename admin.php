<?php
  session_start();
    if (!$_SESSION['isAdmin'] || !$_SESSION['isLogged']) {
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
<body>
  <div class="site">
    <header>
      <div class="header container">
        <h1>E-dziennik</h1>

        <div class="header__user">
          <div class="header__user--info">
            <h5>
              Witaj, <?= $_SESSION['username'] ?>
            </h5>
          </div>
          <div class="header__user--logout">
            <form action="./logout.php" method="post">
              <button type="submit"><span>Logout</span></button>
            </form>
          </div>
        </div>
      </div>
    </header>


    <section>
      <div class="content container">
        <h1>Witaj adminstartorze</h1>
        <div class="admin__content">
          <?php
            require_once('connect.php');

            if ($conn->connect_errno !== 0) :
              echo 'Error: '.$conn->connect_errno;
            else :

              $response = $conn->query('SELECT * FROM pupils');

              while ($row = $response->fetch_assoc()) :
          ?>
            <div class="pupil__name">
                <?= $row['name'].' '.$row['surname'] ?>
            </div>
            <div class="pupil__math">
              <?= $row['math'] ?>
            </div>
            <div class="pupil__polish">
              <?= $row['polish'] ?>
            </div>
            <div class="pupil__it">
              <?= $row['informatics'] ?>
            </div>
          <?php
              endwhile;
            endif;
          ?>
        </div>
      </div>
    </section>
  </div>
</body>
</html>