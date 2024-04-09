import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import data from "./questions.json";

const Quiz = () => {
  const questions = data;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionStatus, setQuestionStatus] = useState(
    questions.map(() => "unanswered")
  );

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz completed! You have ${correctAnswers} correct answers.`);
    }
  };

  const handleClick = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer.text);

    const updatedStatus = [...questionStatus];
    updatedStatus[currentQuestionIndex] = answer.isCorrect
      ? "correct"
      : "incorrect";
    setQuestionStatus(updatedStatus);

    if (answer.isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card sx={{ width: 400 }}>
          <CardContent>
            <Typography variant="h6" component="div" fontWeight="bold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              {questions[currentQuestionIndex].question}
            </Typography>
            <Box>
              {questions[currentQuestionIndex].answers.map((answer) => (
                <Button
                  key={answer.text}
                  onClick={() => handleClick(answer)}
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    backgroundColor:
                      selectedAnswer === answer.text
                        ? answer.isCorrect
                          ? "green"
                          : "red"
                        : "",
                    color: selectedAnswer === answer.text ? "#fff" : "",
                    "&:hover": {
                      backgroundColor:
                        selectedAnswer === answer.text
                          ? answer.isCorrect
                            ? "green"
                            : "red"
                          : "",
                    },
                    my: 1,
                  }}
                >
                  {answer.text}
                </Button>
              ))}
            </Box>
            <Button
              onClick={handleNextQuestion}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Next
            </Button>
            <Box display="flex" justifyContent="center" mt={2}>
              {questionStatus.map((status, index) => (
                <Chip
                  key={index}
                  label={status !== "unanswered" ? "Answered" : "Unanswered"}
                  icon={
                    status !== "unanswered" ? <CheckCircleOutlineIcon /> : null
                  }
                  sx={{
                    backgroundColor:
                      status === "correct"
                        ? "green"
                        : status === "incorrect"
                        ? "red"
                        : "default",
                    color: "#fff",
                    "& .MuiChip-icon": {
                      color: "#fff",
                    },
                    mx: 0.5,
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Quiz;
