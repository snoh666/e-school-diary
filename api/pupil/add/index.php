<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  session_start();

  $pupil_props = json_decode(file_get_contents("php://input"));

  if ($_SESSION['role'] == 'admin') {
    if (!empty($pupil_props->pupil->name) && !empty($pupil_props->pupil->surname)) {
      $pupil = $pupil_props->pupil;
      require_once('../../../connect.php');

      if ($conn->connect_errno !== 0) {
        http_response_code(500);
        echo json_encode(['erorr' => $conn->connect_errno]);
      } else {

        $sql = 'INSERT INTO `pupils`(`name`, `surname`) VALUES ("'.$pupil->name.'","'.$pupil->surname.'")';

        $response = $conn->query($sql);

        if ($response == true) {
          echo json_encode(['Message' => 'New pupil set properly']);
        } else {
          echo json_encode(['Error' => 'Something went wrong' ]);
        }
      }

    } else {
      echo json_encode(['Error' => 'Please specify pupil props' ]);
    }
  } else {
    echo json_encode(['Error' => 'You\'re not an admin' ]);
  }

?>