
'use client';

import React, {useState} from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {ModeToggle} from '@/components/mode-toggle';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Icons} from "@/components/icons";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Textarea} from "@/components/ui/textarea";
import {generateHint} from "@/ai/flows/generate-hints";
import {useToast} from "@/hooks/use-toast";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const chapters = [
  {
    id: '1',
    title: 'Number Systems',
    explanation: 'Understanding different types of numbers and their properties.',
    questions: [
      {
        id: '1',
        text: 'What is the sum of all prime numbers between 10 and 20?',
        category: 'Math',
        type: 'multiple-choice',
        options: ['50', '60', '70', '80'],
        correctAnswer: '60',
      },
    ],
  },
  {
    id: '2',
    title: 'Algebraic Expressions',
    explanation: 'Simplifying and evaluating algebraic expressions.',
    questions: [
      {
        id: '2',
        text: 'Solve for x: 2x + 5 = 15',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
    ],
  },
  {
    id: '3',
    title: 'Basic Chemistry',
    explanation: 'Understanding of atoms, molecules, and basic chemical reactions.',
    questions: [
      {
        id: '3',
        text: 'What is the chemical symbol for water?',
        category: 'Science',
        type: 'multiple-choice',
        options: ['H2O', 'CO2', 'O2', 'NaCl'],
        correctAnswer: 'H2O',
      },
    ],
  },
];

export default function Home() {
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]);
  const [currentQuestion, setCurrentQuestion] = useState(selectedChapter.questions[0]);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState('');
  const {toast} = useToast();
  const [explanationOpen, setExplanationOpen] = React.useState(false)

  const validateAnswer = () => {
    if (studentAnswer.trim() === currentQuestion.correctAnswer) {
      toast({
        title: 'Correct!',
        description: 'Great job! Your answer is correct.',
      });
    } else {
      toast({
        title: 'Incorrect',
        description: `Keep trying! Your answer is not correct. The correct answer is ${currentQuestion.correctAnswer}.`,
      });
    }
  };

  const handleHintRequest = async () => {
    try {
      const hintResponse = await generateHint({
        question: currentQuestion.text,
        category: currentQuestion.category,
      });
      setHint(hintResponse.hint);
      setShowHint(true);
    } catch (error) {
      console.error('Error generating hint:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate hint. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 w-full justify-start px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/500/500" alt="Avatar"/>
                    <AvatarFallback>ZZ</AvatarFallback>
                  </Avatar>
                  <span>Olympiad Prep</span>
                  <Icons.chevronDown className="h-4 w-4 opacity-50"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" forceMount className="w-56">
                <DropdownMenuItem>
                  <ModeToggle/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarHeader>
          <SidebarSeparator/>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {chapters.map((chapter) => (
                  <SidebarMenuItem key={chapter.id}>
                    <SidebarMenuButton onClick={() => {
                      setSelectedChapter(chapter);
                      setCurrentQuestion(chapter.questions[0]);
                    }}>
                      {chapter.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarTrigger>
              <Button variant="outline" size="sm" className="w-full">
                <Icons.settings className="mr-2 h-4 w-4"/>
                Settings
              </Button>
            </SidebarTrigger>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 p-4">
          <Card className="w-full h-full flex flex-col">
            <CardHeader>
              <CardTitle>{selectedChapter.title}</CardTitle>
              <CardDescription>Test your knowledge!</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <p className="text-lg font-semibold">Question:</p>
                <p className="text-md">{currentQuestion.text}</p>
              </div>

              {currentQuestion.type === 'multiple-choice' ? (
                <div className="mb-4">
                  {currentQuestion.options.map((option) => (
                    <label key={option} className="block">
                      <input
                        type="radio"
                        name="answer"
                        value={option}
                        className="mr-2"
                        onChange={(e) => setStudentAnswer(e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="mb-4">
                  <Textarea
                    placeholder="Enter your answer"
                    className="w-full"
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={validateAnswer}>Submit Answer</Button>
              <Button variant="secondary" onClick={handleHintRequest}>
                Get Hint
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Sheet open={explanationOpen} onOpenChange={setExplanationOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Chapter Explanation</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{selectedChapter.title} Explanation</SheetTitle>
              <SheetDescription>
                {selectedChapter.explanation}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      {showHint && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-100 p-4">
          <p>Hint: {hint}</p>
          <Button onClick={() => setShowHint(false)}>Close Hint</Button>
        </div>
      )}
    </SidebarProvider>
  );
}
