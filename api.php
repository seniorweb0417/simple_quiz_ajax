<?php
    const DB_HOST = 'localhost';
    const DB_USER = 'root';
    const DB_PASSWORD = '';
    const DB_NAME = 'james_quiz';

    $action = isset($_POST['action']) ? $_POST['action'] : '';

    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    $mysqli->set_charset("utf8");

    switch ($action) {
        case 'type':
            $types = array();

            $result = $mysqli->query("SELECT DISTINCT Type FROM questions_1");
            while ($row = $result->fetch_assoc()) {
                $types[] = $row['Type'];
            }

            echo json_encode($types);
            break;
        case 'q1':
            $q1_text = array();
            $q1 = array();

            $result = $mysqli->query("SELECT Q1_text, Q1 from questions_1");
            while ($row = $result->fetch_assoc()) {
                if (array_search($row['Q1_text'], $q1_text) === false) 
                    $q1_text[] = $row['Q1_text'];
                if (array_search($row['Q1'], $q1) === false) 
                    $q1[] = $row['Q1'];
           }

            echo json_encode(array(
                'Q1_text' => $q1_text,
                'Q1' => $q1
            ));
            break;
        case 'q2':
            $q1 = isset($_POST['q1']) ? $_POST['q1'] : '';

            $q2_text = array();
            $q2 = array();

            $result = $mysqli->query("SELECT Q2_text, Q2 from questions_1 WHERE Q1=\"" . $q1 . "\"");
            while ($row = $result->fetch_assoc()) {
                if (array_search($row['Q2_text'], $q2_text) === false) 
                    $q2_text[] = $row['Q2_text'];
                if (array_search($row['Q2'], $q2) === false) 
                    $q2[] = $row['Q2'];
            }

            echo json_encode(array(
                'Q2_text' => $q2_text,
                'Q2' => $q2
            ));
            break;
        case 'idea':
            $q2 = isset($_POST['q2']) ? $_POST['q2'] : '';

            $ideas = array();

            $result = $mysqli->query("SELECT ideas from questions_1 WHERE Q2=\"" . $q2 . "\"");
            while ($row = $result->fetch_assoc()) {
                $ideas [] = $row['ideas'];
            }

            echo json_encode($ideas);
            break;
        default:
            break;
    }
?>
