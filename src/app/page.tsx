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
      {
        id: '2',
        text: 'Which of the following is a composite number?',
        category: 'Math',
        type: 'multiple-choice',
        options: ['2', '3', '5', '9'],
        correctAnswer: '9',
      },
      {
        id: '3',
        text: 'What is the value of pi to two decimal places?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '3.14',
      },
      {
        id: '4',
        text: 'Solve for x: 2x + 5 = 15',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '5',
        text: 'Simplify: 3(a + 2b) - a + b',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '2a + 7b',
      },
      {
        id: '6',
        text: 'If x = 3 and y = 4, what is the value of x^2 + y^2?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '25',
      },
      {
        id: '7',
        text: 'What is the next prime number after 23?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '29',
      },
      {
        id: '8',
        text: 'Calculate: 15% of 200',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '30',
      },
      {
        id: '9',
        text: 'What is the square root of 144?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '12',
      },
      {
        id: '10',
        text: 'If a train travels 120 miles in 2 hours, what is its average speed?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '60',
      },
      {
        id: '11',
        text: 'Solve for y: 3y - 7 = 14',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '7',
      },
      {
        id: '12',
        text: 'What is the area of a circle with a radius of 7?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '154',
      },
      {
        id: '13',
        text: 'What is 7 cubed?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '343',
      },
      {
        id: '14',
        text: 'If 5x = 35, then x = ?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '7',
      },
      {
        id: '15',
        text: 'What is the value of 10! (10 factorial)?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '3628800',
      },
      {
        id: '16',
        text: 'Solve for z: z/4 + 8 = 12',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '16',
      },
      {
        id: '17',
        text: 'What is the circumference of a circle with diameter 28?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '88',
      },
      {
        id: '18',
        text: 'What is the value of the expression 4^3 - 3^4?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '-17',
      },
      {
        id: '19',
        text: 'If you deposit $500 in a savings account with an annual interest rate of 5%, how much interest will you earn in one year?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '25',
      },
      {
        id: '20',
        text: 'A store sells a product for $45, which includes a 20% markup. What was the original cost of the product?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '37.5',
      },
      {
        id: '21',
        text: 'What is the result of (3 + 5) × 2 - 8 ÷ 4?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '14',
      },
      {
        id: '22',
        text: 'If two angles of a triangle measure 60° and 80°, what is the measure of the third angle?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '40',
      },
      {
        id: '23',
        text: 'Calculate 25 ÷ 0.5 + 10 × 3 - 20',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '60',
      },
      {
        id: '24',
        text: 'If one side of a square is 9 cm, what is its area?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '81',
      },
      {
        id: '25',
        text: 'If a circle has a radius of 6 meters, what is its area?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '113.1',
      },
      {
        id: '26',
        text: 'A bag contains 3 red marbles, 4 blue marbles, and 5 green marbles. What is the probability of picking a blue marble?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '0.333',
      },
      {
        id: '27',
        text: 'What is the volume of a cube with each side measuring 4 inches?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '64',
      },
      {
        id: '28',
        text: 'If the perimeter of a rectangle is 30 cm and its length is 10 cm, what is its width?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '29',
        text: 'A car travels at a speed of 80 km/h. How long does it take to travel 400 km?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '30',
        text: 'What is the next number in the sequence: 2, 6, 12, 20, ?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '30',
      },
      {
        id: '31',
        text: 'Find the value of x in the equation 4x + 2 = 18',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '4',
      },
      {
        id: '32',
        text: 'If 3 notebooks cost $6.75, how much does one notebook cost?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '2.25',
      },
      {
        id: '33',
        text: 'What is the area of a triangle with base 12 cm and height 8 cm?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '48',
      },
      {
        id: '34',
        text: 'If a person saves $150 each month, how much will they save in 2 years?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '3600',
      },
      {
        id: '35',
        text: 'What is the sum of the first 10 positive integers?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '55',
      },
      {
        id: '36',
        text: 'A discount of 15% is applied to a dress that costs $80. What is the sale price?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '68',
      },
      {
        id: '37',
        text: 'What is the value of (-3)^3?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '-27',
      },
      {
        id: '38',
        text: 'Convert 45% to a fraction in simplest form',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '9/20',
      },
      {
        id: '39',
        text: 'If a student scores 75 out of 125 on a test, what percentage did they get?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '60',
      },
      {
        id: '40',
        text: 'What is the product of 0.6 and 0.8?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '0.48',
      },
      {
        id: '41',
        text: 'A train leaves Station A at 6:00 AM and arrives at Station B at 11:30 AM. If the distance between the stations is 460 km, what is the average speed of the train?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '83.64',
      },
      {
        id: '42',
        text: 'A phone is listed for $600 and is discounted by 30%. A sales tax of 8% is then added. What is the final price?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '462.24',
      },
      {
        id: '43',
        text: 'You drive from home at an average speed of 60 mph and arrive in 3 hours. How far do you drive?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '180',
      },
      {
        id: '44',
        text: 'You have a cylindrical tank with a radius of 3 meters and a height of 8 meters. What is its volume?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '226.19',
      },
      {
        id: '45',
        text: 'A recipe requires 2 cups of flour for every 3 eggs. If you want to use 9 eggs, how many cups of flour do you need?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '6',
      },
      {
        id: '46',
        text: 'Find the perimeter of a square garden with an area of 625 square feet.',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '100',
      },
      {
        id: '47',
        text: 'You invest $3000 in a fund that promises a return of 6% compounded annually. How much money will you have after 5 years?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '4014.68',
      },
      {
        id: '48',
        text: 'Solve for x: 7x − 5 = 3x + 15',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '49',
        text: 'Calculate: 100 - (45 + 32)',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '23',
      },
      {
        id: '50',
        text: 'Find the value of y: 6y + 3(2y − 1) = 9',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '1',
      },
      {
        id: '51',
        text: 'Calculate the percentage increase: Old Value = 200, New Value = 250',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '25',
      },
      {
        id: '52',
        text: 'Find the LCM of 12 and 18',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '36',
      },
      {
        id: '53',
        text: 'Simplify: (4^5) / (4^2)',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '64',
      },
      {
        id: '54',
        text: 'A store offers a 25% discount on a camera listed at $300. What is the sale price?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '225',
      },
      {
        id: '55',
        text: 'What is the probability of rolling a 4 on a 6-sided die?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '1/6',
      },
      {
        id: '56',
        text: 'A ladder leans against a wall, forming a right triangle. The ladder is 15 feet long, and the base of the ladder is 9 feet from the wall. How high up the wall does the ladder reach?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '12',
      },
      {
        id: '57',
        text: 'The measure of each angle in a regular pentagon',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '108',
      },
      {
        id: '58',
        text: 'Simplify: (6x^3 + 9x^2) / (3x)',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '2x^2 + 3x',
      },
      {
        id: '59',
        text: 'You are planning a rectangular garden that is twice as long as it is wide. If you have 42 feet of fencing, what are the dimensions of your garden?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '7, 14',
      },
      {
        id: '60',
        text: 'The diameter of the wheel is 14inches what is the circumference?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '44',
      },
      {
        id: '61',
        text: 'What is 11% of 1100?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '121',
      },
      {
        id: '62',
        text: 'Solve for a : 4a/3 = 16',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '12',
      },
      {
        id: '63',
        text: '5^6 divided by 5^4',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '25',
      },
      {
        id: '64',
        text: 'Express as a decimal 9/20',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '0.45',
      },
      {
        id: '65',
        text: 'What is the sum of interior angles of a triangle?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '180',
      },
      {
        id: '66',
        text: 'You borrow $5000 at an annual interest rate of 8%. What is the simple interest due after 3 years?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '1200',
      },
      {
        id: '67',
        text: 'What is the average of 2, 8, 15, and 21?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '11.5',
      },
      {
        id: '68',
        text: 'Calculate the value of 4! + 3! - 2!',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '28',
      },
      {
        id: '69',
        text: 'What is the HCF of 36 and 48',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '12',
      },
      {
        id: '70',
        text: 'Find the missing term in the series: 1, 4, 9, 16, ?, 36',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '25',
      },
      {
        id: '71',
        text: 'The base of an isosceles triangle is 8cm and its perimeter is 28cm. Find the length of each of the equal sides',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '10',
      },
      {
        id: '72',
        text: 'Which is bigger 2^8 or 3^5',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '3^5',
      },
      {
        id: '73',
        text: 'If the area of a circle is 49π sq. cm, find its circumference',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '14π',
      },
      {
        id: '74',
        text: 'What is a googol?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '10^100',
      },
      {
        id: '75',
        text: 'Solve for x, |x - 5| = 3',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '2, 8',
      },
      {
        id: '76',
        text: 'Find the next number in this series 19, 23, 29, 31, 37, ?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '41',
      },
      {
        id: '77',
        text: 'The ratio of two numbers is 5:6. If the sum of the numbers is 55, find the numbers.',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '25, 30',
      },
      {
        id: '78',
        text: 'If a dozen apples cost $18, how much will 5 apples cost?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '7.5',
      },
      {
        id: '79',
        text: 'Express 0.36 as a fraction in the lowest form',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '9/25',
      },
      {
        id: '80',
        text: 'What is the number of diagonals in a heptagon?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '14',
      },
      {
        id: '81',
        text: 'What is 150% of 70?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '105',
      },
      {
        id: '82',
        text: 'Solve for c : c/5 + 7 = 12',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '25',
      },
      {
        id: '83',
        text: 'If log 100 = x, what is x?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '2',
      },
      {
        id: '84',
        text: 'What are twin primes?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'Primes that differ by 2',
      },
      {
        id: '85',
        text: 'A watch loses 5 minutes every hour. How many hours will it take for the watch to lose 1 hour?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '12',
      },
      {
        id: '86',
        text: 'A rectangle is 10 cms long and 6 cms wide. If the length is reduced by 2 cm and width increased by 2 cms, by what amount will the area change?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'No Change',
      },
      {
        id: '87',
        text: 'What is a perfect number?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'Sum of divisors equals the number',
      },
      {
        id: '88',
        text: 'The angles of a quadrilateral are in the ratio 3:5:9:13. Find the measure of the largest angle',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '156',
      },
      {
        id: '89',
        text: 'When is Pi day celebrated?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'March 14',
      },
      {
        id: '90',
        text: 'What is a Mersenne Prime?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'Prime of the form 2^n - 1',
      },
      {
        id: '91',
        text: 'If one ream of paper costs $7, how many reams can you buy for $98?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '14',
      },
      {
        id: '92',
        text: 'If the radius of a sphere is tripled, how does the volume change?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'Multiplies by 27',
      },
      {
        id: '93',
        text: 'What is the smallest composite number?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '4',
      },
      {
        id: '94',
        text: 'If m + n = 25, what is the value of m + n + 8?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '33',
      },
      {
        id: '95',
        text: 'The height and base of a triangle are 20cm each what is the triangles area?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '200',
      },
      {
        id: '96',
        text: 'A 20 feet ladder rests against a wall 12 feet from the wall. How high up the wall will the ladder rest?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '16',
      },
      {
        id: '97',
        text: 'Average age of 3 children is 9 years. The ages of two of them are 8 years and 11 years. What is the age of the third child?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '8',
      },
      {
        id: '98',
        text: 'What is a Fibonacci Sequence?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'Sum of Previous 2 numbers',
      },
      {
        id: '99',
        text: 'If a train covers 195 miles in 3 hours, what is the average speed of the train?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '65',
      },
      {
        id: '100',
        text: 'An article costs $495 with a 10% sales tax on it. How much will the article cost after the taxes are applied?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '544.5',
      },
    ],
  },
  {
    id: '2',
    title: 'Algebraic Expressions',
    explanation: 'Simplifying and evaluating algebraic expressions.',
    questions: [
      {
        id: '4',
        text: 'Solve for x: 2x + 5 = 15',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '5',
        text: 'Simplify: 3(a + 2b) - a + b',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '2a + 7b',
      },
      {
        id: '6',
        text: 'If x = 3 and y = 4, what is the value of x^2 + y^2?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '25',
      },
      {
        id: '7',
        text: 'If 4(2x - 3) = 36, what is the value of x?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '6',
      },
      {
        id: '8',
        text: 'Solve for a: 5a + 3 = 2a + 15',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '4',
      },
      {
        id: '9',
        text: 'Simplify: 4m - 2(3 - m)',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '6m - 6',
      },
      {
        id: '10',
        text: 'Evaluate: (2x + 3y) / (x - y) when x = 4 and y = 2',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '14',
      },
      {
        id: '11',
        text: 'Solve for y: 3(y + 5) - 2 = 25',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '4',
      },
      {
        id: '12',
        text: 'What is the value of p in the equation 2p - 8 = 0?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '4',
      },
      {
        id: '13',
        text: 'Solve for x in the equation 5x + 3 = 18',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '3',
      },
      {
        id: '14',
        text: 'If 2x - 1 = 9, what is the value of x?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '15',
        text: 'Solve for y: 4y + 3(y - 2) = 8',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '2',
      },
      {
        id: '16',
        text: 'Find x if 3(x + 2) = 15',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '3',
      },
      {
        id: '17',
        text: 'Solve for y in the equation 2(y - 1) = 8',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '18',
        text: 'If 5x + 2 = 17, what is x?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '3',
      },
      {
        id: '19',
        text: 'Solve: 2a + 3 = a + 7',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '4',
      },
      {
        id: '20',
        text: 'Simplify: 4(x - 2) + 5x = 28',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '4',
      },
      {
        id: '21',
        text: 'If a/3 - 1 = 5, find a',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '18',
      },
      {
        id: '22',
        text: 'Solve for p in the equation 3p - 7 = 20',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '9',
      },
      {
        id: '23',
        text: 'What is the value of x if 4x + 2 = 22?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '24',
        text: 'Solve for m: 2(m + 1) = 16',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '7',
      },
      {
        id: '25',
        text: 'Given 5x - 10 = 25, what is x?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '7',
      },
      {
        id: '26',
        text: 'Find x in the equation 3x - 5 = 16',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '7',
      },
      {
        id: '27',
        text: 'If 4(y + 2) = 24, what is the value of y?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '4',
      },
      {
        id: '28',
        text: 'Solve for a in the equation 2a + 7 = 19',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '6',
      },
      {
        id: '29',
        text: 'If 3x + 5 = 26, what is x equal to?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '7',
      },
      {
        id: '30',
        text: 'Solve for p: 6p - 12 = 36',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '8',
      },
      {
        id: '31',
        text: 'Find the value of x in the equation 7x - 14 = 0',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '2',
      },
      {
        id: '32',
        text: 'Solve for m in the equation 5m + 3 = 23',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '4',
      },
      {
        id: '33',
        text: 'If 2(x + 3) = 14, then x = ?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '4',
      },
      {
        id: '34',
        text: 'Solve for y: 4y - 8 = 12',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '35',
        text: 'If 3(a - 2) = 18, find a',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '8',
      },
      {
        id: '36',
        text: 'Solve for p: 2p + 5 = 15',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '37',
        text: 'What is the value of x if 6x - 9 = 21?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '38',
        text: 'Solve for m in the equation 5m + 10 = 45',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '7',
      },
      {
        id: '39',
        text: 'If 2(x - 3) = 10, then x = ?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '8',
      },
      {
        id: '40',
        text: 'Solve for y: 4y + 5 = 25',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '41',
        text: 'Solve for x: 3x + 7 = 19',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '4',
      },
      {
        id: '42',
        text: 'If 5y - 4 = 21, what is the value of y?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '43',
        text: 'What is the solution to 2(a + 3) = 16?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '5',
      },
      {
        id: '44',
        text: 'Find the value of m in the equation 3m - 11 = 19',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '10',
      },
      {
        id: '45',
        text: 'If 4p + 2 = 30, solve for p',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '7',
      },
      {
        id: '46',
        text: 'Solve for a in the equation 6a - 4 = 32',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '6',
      },
      {
        id: '47',
        text: 'What is the result when solving for x: 3x + 6 = 42?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '12',
      },
      {
        id: '48',
        text: 'If 5y + 3 = 48, what is y equal to?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '9',
      },
      {
        id: '49',
        text: 'Solve for p: 2(p - 5) = 24',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '17',
      },
      {
        id: '50',
        text: 'What is the value of x if 7x - 12 = 47?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '9',
      },
      {
        id: '51',
        text: 'Solve for y: 9y + 15 = 69',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '6',
      },
      {
        id: '52',
        text: 'What is the value of z, given 2z - 5 = 31?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '18',
      },
      {
        id: '53',
        text: 'Find the missing number: 3(x + 7) = 57',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '12',
      },
      {
        id: '54',
        text: 'What is the value of x in the equation 12x - 10 = 134?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '12',
      },
      {
        id: '55',
        text: 'Given 2a + 4 = 38, what is the value of a?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '17',
      },
      {
        id: '56',
        text: 'Solve for x: 5x + 14 = 64',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '10',
      },
      {
        id: '57',
        text: 'Find x in the equation 4(x - 3) = 32',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '11',
      },
      {
        id: '58',
        text: 'The perimeter of a rectangle is represented by P = 2L + 2W, where P = 80 and L = 22. Solve for W',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '18',
      },
      {
        id: '59',
        text: 'A triangle has angles A, B, and C. If angle A = 52 degrees and angle B = 81 degrees, find angle C',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '47',
      },
      {
        id: '60',
        text: 'What is the surface area of the sphere?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '4πr²',
      },
      {
        id: '61',
        text: '2/3(x + 5) = 40, what is x?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '55',
      },
      {
        id: '62',
        text: 'Solve for b : 2b + 8 = 20',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '6',
      },
      {
        id: '63',
        text: 'If x = 6, what is x squared + 5x - 10?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '56',
      },
      {
        id: '64',
        text: 'What is the simplified version of a + a + b +b + b?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '2a + 3b',
      },
      {
        id: '65',
        text: 'What is the x is 5x + 22 -x = 54?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '8',
      },
      {
        id: '66',
        text: 'If 2x+3 = 5x-11, solve for x',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '14/3',
      },
      {
        id: '67',
        text: 'What is the simplified form of  (3x+5y)+(4x-6y)?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '7x - y',
      },
      {
        id: '68',
        text: 'What is the answer for a in  4(a+3)=36?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '6',
      },
      {
        id: '69',
        text: 'What does x = in 3x + 11 = 56',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '15',
      },
      {
        id: '70',
        text: 'Solve for x: 5x^2 + 20 = 45.',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '±√5',
      },
      {
        id: '71',
        text: 'Simplify: 4y - 2(3 - y)',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '6y - 6',
      },
      {
        id: '72',
        text: 'if y = -1, what does 2y^3 + 4y^2 - 3y + 7 =?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '12',
      },
      {
        id: '73',
        text: 'What would b be if 6b + 3(2b-1) = 9?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '1',
      },
      {
        id: '74',
        text: 'What is a polynomial?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'Expression with constants and variables',
      },
      {
        id: '75',
        text: 'Solve for w, |w - 5| = 3',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '2, 8',
      },
      {
        id: '76',
        text: 'Solve for z: 3z - 14 = 28',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '14',
      },
      {
        id: '77',
        text: 'A+B = 10, B+C = 20. What does C-A =?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '10',
      },
      {
        id: '78',
        text: 'If a book store sold x number of books in one year and 2x + 10 books in another year. If x=30 what is the total of books that was sold?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '100',
      },
      {
        id: '79',
        text: 'If the perimeter of an equlateral triangle is 90cm what is each side measuring as?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '30',
      },
      {
        id: '80',
        text: 'if 3/5 x - 7 = 2 what is x?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '15',
      },
      {
        id: '81',
        text: 'What does a equal if a=4b^2 and b =3?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '36',
      },
      {
        id: '82',
        text: 'If x/5 + 7 = 12, what is x?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '25',
      },
      {
        id: '83',
        text: 'Simplify 4(x+6) / 8.',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '(x + 6) / 2',
      },
      {
        id: '84',
        text: 'What is a quadratic equation?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'An equation where the highest exponent is two',
      },
      {
        id: '85',
        text: 'If x^2 = 64, what is x',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '8',
      },
      {
        id: '86',
        text: 'Simplify: a(b+c)',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'ab+ac',
      },
      {
        id: '87',
        text: 'Which equation has a solution of x = 3',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '3x + 5 = 14',
      },
      {
        id: '88',
        text: 'What is 3a^3 + 3a + 33a^2 if a is 1?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '39',
      },
      {
        id: '89',
        text: 'If 2a - 8 = -2, solve for a',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '3',
      },
      {
        id: '90',
        text: 'The sides of a triangle is a, b, c what will the perimeter be',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'a + b + c',
      },
      {
        id: '91',
        text: 'If the ratio of two supplementary angles is 2:3, what is the measure of the smaller angle?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '72',
      },
      {
        id: '92',
        text: 'Simplify and express with positive exponents: (x^−2)(y^3)',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'y^3 / x^2',
      },
      {
        id: '93',
        text: 'Factor completely: 16 - x^2',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '(4 + x)(4 - x)',
      },
      {
        id: '94',
        text: 'Find the sum of the roots of the quadratic equation x^2 + 5x + 6 = 0',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '-5',
      },
      {
        id: '95',
        text: 'Solve the inequality for x: 3x + 5 < 14',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'x < 3',
      },
      {
        id: '96',
        text: 'How do you calculate the circumference of a circle?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'πd or 2πr',
      },
      {
        id: '97',
        text: 'The sides of a triangle are in ratio of 3:4:5 what kind of triangle is this?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'Right angle triangle',
      },
      {
        id: '98',
        text: 'What does a co-efficient mean?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'Number in front of a variable',
      },
      {
        id: '99',
        text: 'If a rectangle is 10 by 14 what is the area',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '140',
      },
      {
        id: '100',
        text: 'What does area mean?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: 'Measurement of a surface',
      },
    ],
  },
  {
    id: '3',
    title: 'Basic Chemistry',
    explanation: 'Understanding of atoms, molecules, and basic chemical reactions.',
    questions: [
      {
        id: '7',
        text: 'What is the chemical symbol for water?',
        category: 'Science',
        type: 'multiple-choice',
        options: ['H2O', 'CO2', 'O2', 'NaCl'],
        correctAnswer: 'H2O',
      },
      {
        id: '8',
        text: 'Which element is most abundant in Earth’s atmosphere?',
        category: 'Science',
        type: 'multiple-choice',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correctAnswer: 'Nitrogen',
      },
      {
        id: '9',
        text: 'What is the pH of a neutral solution?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: '7',
      },
      {
        id: '10',
        text: 'What is the chemical symbol for gold?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Au',
      },
      {
        id: '11',
        text: 'What is the smallest particle of an element that retains the properties of that element?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Atom',
      },
      {
        id: '12',
        text: 'What is the process by which plants convert carbon dioxide and water into glucose and oxygen?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Photosynthesis',
      },
      {
        id: '13',
        text: 'What is the molecular formula for table salt?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'NaCl',
      },
      {
        id: '14',
        text: 'What is the lightest element in the periodic table?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Hydrogen',
      },
      {
        id: '15',
        text: 'What is the common name for the compound hydrogen peroxide?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Bleach',
      },
      {
        id: '16',
        text: 'What is the name of the process where a solid turns directly into a gas?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Sublimation',
      },
      {
        id: '17',
        text: 'What is the chemical symbol for silver?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Ag',
      },
      {
        id: '18',
        text: 'What is the most abundant gas in the universe?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Hydrogen',
      },
      {
        id: '19',
        text: 'What is the chemical formula for methane?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'CH4',
      },
      {
        id: '20',
        text: 'What is the name of the temperature at which a liquid turns into a gas?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Boiling point',
      },
      {
        id: '21',
        text: 'What is the atomic number of carbon?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: '6',
      },
      {
        id: '22',
        text: 'What is the name for a substance that speeds up a chemical reaction without being consumed in the reaction?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Catalyst',
      },
      {
        id: '23',
        text: 'What is the chemical formula for ozone?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'O3',
      },
      {
        id: '24',
        text: 'What is the process by which a gas turns into a liquid?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Condensation',
      },
      {
        id: '25',
        text: 'What is the chemical symbol for potassium?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'K',
      },
      {
        id: '26',
        text: 'What is the term for a solution that contains more solute than it can theoretically hold at a given temperature?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Supersaturated',
      },
      {
        id: '27',
        text: 'What is the chemical formula for ammonia?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'NH3',
      },
      {
        id: '28',
        text: 'What is the name of the smallest unit of a compound that retains the chemical properties of that compound?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Molecule',
      },
      {
        id: '29',
        text: 'What is the chemical symbol for iron?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Fe',
      },
      {
        id: '30',
        text: 'What is the term for a substance that cannot be broken down into simpler substances by chemical means?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Element',
      },
      {
        id: '31',
        text: 'What is the chemical formula for carbon dioxide?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'CO2',
      },
      {
        id: '32',
        text: 'What is the process where a liquid turns into a solid?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Freezing',
      },
      {
        id: '33',
        text: 'What is the chemical symbol for copper?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Cu',
      },
      {
        id: '34',
        text: 'What is the term for a mixture where the components are uniformly distributed?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Homogeneous',
      },
      {
        id: '35',
        text: 'What is the chemical formula for hydrochloric acid?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'HCl',
      },
      {
        id: '36',
        text: 'What is the name of the phenomenon where certain substances emit light after absorbing energy?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Fluorescence',
      },
      {
        id: '37',
        text: 'What is the chemical symbol for lead?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Pb',
      },
      {
        id: '38',
        text: 'What is the term for a substance that donates protons or accepts electrons in a chemical reaction?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Acid',
      },
      {
        id: '39',
        text: 'What is the chemical formula for glucose?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'C6H12O6',
      },
      {
        id: '40',
        text: 'What is the name of the process where a substance combines with oxygen to produce heat and light?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Combustion',
      },
      {
        id: '41',
        text: 'What is the chemical symbol for mercury?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Hg',
      },
      {
        id: '42',
        text: 'What is the term for a substance that neutralizes acids and donates electrons or accepts protons?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Base',
      },
      {
        id: '43',
        text: 'What is the chemical formula for ethanol?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'C2H5OH',
      },
      {
        id: '44',
        text: 'What is the name of the scale used to measure the acidity or alkalinity of a solution?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'pH scale',
      },
      {
        id: '45',
        text: 'What is the chemical symbol for zinc?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Zn',
      },
      {
        id: '46',
        text: 'What is the term for a reaction that releases heat?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Exothermic',
      },
      {
        id: '47',
        text: 'What is the chemical formula for sulfuric acid?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'H2SO4',
      },
      {
        id: '48',
        text: 'What is the name of the process by which a nucleus of an atom splits into smaller parts?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Nuclear fission',
      },
      {
        id: '49',
        text: 'What is the chemical symbol for calcium?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Ca',
      },
      {
        id: '50',
        text: 'What is the term for a substance that dissolves in a solvent?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Solute',
      },
      {
        id: '51',
        text: 'Which gas do plants absorb from the atmosphere during photosynthesis?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Carbon dioxide',
      },
      {
        id: '52',
        text: 'What is the basic unit of heredity?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Gene',
      },
      {
        id: '53',
        text: 'What is the process by which water changes from a liquid to a gas?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Evaporation',
      },
      {
        id: '54',
        text: 'What is the function of the ozone layer?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Absorb UV radiation',
      },
      {
        id: '55',
        text: 'What is the name of the force that opposes motion between two surfaces in contact?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Friction',
      },
      {
        id: '56',
        text: 'What is the term for the energy stored in an object due to its position?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Potential energy',
      },
      {
        id: '57',
        text: 'Which type of cell lacks a nucleus?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Prokaryotic',
      },
      {
        id: '58',
        text: 'What is the process by which cells divide to produce identical daughter cells?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Mitosis',
      },
      {
        id: '59',
        text: 'What is the primary function of red blood cells?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Oxygen transport',
      },
      {
        id: '60',
        text: 'What is the name of the vestigial organ in humans that is attached to the large intestine?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Appendix',
      },
      {
        id: '61',
        text: 'What process do plant cells undergo to produce energy?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Cellular respiration',
      },
      {
        id: '62',
        text: 'Name the largest planet in our solar system',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Jupiter',
      },
      {
        id: '63',
        text: 'What is measured by an anemometer?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Wind Speed',
      },
      {
        id: '64',
        text: 'What is the force that pulls objects towards each other?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Gravitation',
      },
      {
        id: '65',
        text: 'What is the name of the process by which living organisms maintain a stable internal environment?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Homeostasis',
      },
      {
        id: '66',
        text: 'What is the purpose of a control group in scientific experiments?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Baseline for comparison',
      },
      {
        id: '67',
        text: 'What force opposes motion between two surfaces?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Friction',
      },
      {
        id: '68',
        text: 'Name the three states of matter.',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Solid, Liquid, Gas',
      },
      {
        id: '69',
        text: 'What is the name for a push or a pull?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Force',
      },
      {
        id: '70',
        text: 'What is a biome?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'A large community of organisms and plants in an environment',
      },
      {
        id: '71',
        text: 'What is a cell?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Basic unit of life',
      },
      {
        id: '72',
        text: 'What are the functions of the kidneys?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'To filter the blood and produce urine',
      },
      {
        id: '73',
        text: 'How are igneous rocks formed?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'From cooling magma or lava',
      },
      {
        id: '74',
        text: 'What process do all living things perform to release energy from sugars?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Cellular Respiration',
      },
      {
        id: '75',
        text: 'What is the name of our Galaxy?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Milky Way',
      },
      {
        id: '76',
        text: 'What part of the human body makes insulin?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Pancreas',
      },
      {
        id: '77',
        text: 'What is the value of absolute zero in Celsius?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: '-273.15',
      },
      {
        id: '78',
        text: 'What does metamorphosis mean?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Transformation',
      },
      {
        id: '79',
        text: 'Which planet is closest to the sun?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Mercury',
      },
      {
        id: '80',
        text: 'What is the chemical symbol for oxygen?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'O',
      },
      {
        id: '81',
        text: 'How many ventricles are in the human heart?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: '2',
      },
      {
        id: '82',
        text: 'What name is given for the height of a wave?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Amplitude',
      },
      {
        id: '83',
        text: 'The Earth is composed of four layers. Name them.',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Crust, mantle, outer core and inner core',
      },
      {
        id: '84',
        text: 'What causes day and night?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Earths rotation',
      },
      {
        id: '85',
        text: 'How many vertebrae are in the human spinal column?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: '33',
      },
      {
        id: '86',
        text: 'What system of measurement is typically used by scientists?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'The metric system',
      },
      {
        id: '87',
        text: 'Name the four main blood types.',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'A, B, AB, and O',
      },
      {
        id: '88',
        text: 'What is the name of the branch of science that studies plants?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Botany',
      },
      {
        id: '89',
        text: 'What is the name for a group of lions?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Pride',
      },
      {
        id: '90',
        text: 'Which of the five senses develops first?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Touch',
      },
      {
        id: '91',
        text: 'What is the biggest planet in our solar system?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Jupiter',
      },
      {
        id: '92',
        text: 'How many teeth does an adult human typically have?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: '32',
      },
      {
        id: '93',
        text: 'What is the name for a baby frog?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Tadpole',
      },
      {
        id: '94',
        text: 'The Sun is mainly composed of which element?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Hydrogen',
      },
      {
        id: '95',
        text: 'Name the three main types of rocks.',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Igneous, Sedimentary, Metamorphic',
      },
      {
        id: '96',
        text: 'What are the phases of the moon?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'New, crescent, half, gibbous, full',
      },
      {
        id: '97',
        text: 'What vitamin does the human body produce when exposed to the sun?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Vitamin D',
      },
      {
        id: '98',
        text: 'What is the name of a supercontinent that began breaking apart about 200 million years ago?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Pangaea',
      },
      {
        id: '99',
        text: 'Which blood type is the "universal donor?"',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'O negative',
      },
      {
        id: '100',
        text: 'Name the four seasons.',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Winter, Spring, Summer, Autumn',
      },
    ],
  },
  {
    id: '4',
    title: 'Geometry Basics',
    explanation: 'Fundamentals of shapes, angles, and spatial relationships.',
    questions: [
      {
        id: '10',
        text: 'How many degrees are in a right angle?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '90',
      },
      {
        id: '11',
        text: 'What is the area of a rectangle with length 5 and width 3?',
        category: 'Math',
        type: 'free-form',
        correctAnswer: '15',
      },
      {
        id: '12',
        text: 'Which shape has the most sides?',
        category: 'Math',
        type: 'multiple-choice',
        options: ['Triangle', 'Square', 'Pentagon', 'Octagon'],
        correctAnswer: 'Octagon',
      },
    ],
  },
  {
    id: '5',
    title: 'Ecology',
    explanation: 'Basic concepts of ecosystems, food chains, and environmental interactions.',
    questions: [
      {
        id: '13',
        text: 'What is the primary source of energy for most ecosystems?',
        category: 'Science',
        type: 'multiple-choice',
        options: ['Sun', 'Wind', 'Water', 'Geothermal'],
        correctAnswer: 'Sun',
      },
      {
        id: '14',
        text: 'Name a primary consumer in a typical food chain.',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Herbivore',
      },
      {
        id: '15',
        text: 'What process do plants use to convert sunlight into energy?',
        category: 'Science',
        type: 'free-form',
        correctAnswer: 'Photosynthesis',
      },
    ],
  },
];

export default function Home() {
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(selectedChapter.questions[questionIndex]);
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

  const goToNextQuestion = () => {
    if (questionIndex < selectedChapter.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestion(selectedChapter.questions[questionIndex + 1]);
      setStudentAnswer('');
      setShowHint(false);
    } else {
      toast({
        title: 'End of Chapter',
        description: 'You have reached the end of the chapter.',
      });
    }
  };

  const goToPreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setCurrentQuestion(selectedChapter.questions[questionIndex - 1]);
      setStudentAnswer('');
      setShowHint(false);
    } else {
      toast({
        title: 'Beginning of Chapter',
        description: 'You are at the beginning of the chapter.',
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
                      setQuestionIndex(0);
                      setCurrentQuestion(chapter.questions[0]);
                      setStudentAnswer('');
                      setShowHint(false);
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
                <p className="text-lg font-semibold">Question {questionIndex + 1} / {selectedChapter.questions.length}:</p>
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
            <CardFooter className="flex justify-between">
              <Button onClick={goToPreviousQuestion} disabled={questionIndex === 0}>
                Previous
              </Button>
              <Button onClick={goToNextQuestion} disabled={questionIndex === selectedChapter.questions.length - 1}>
                Next
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
