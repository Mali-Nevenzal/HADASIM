// twittwerTowre.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
using namespace std;

void printSecondLines(int countSecondLines, int width, int starsCount);

void printTriangle(int width, int height);

void rectangularTower(int height, int width)
{
    int rectanglePerimeter = 0;
    int sum = (height - width);
    if (!sum || abs(sum) == 5)
        cout << "The area of your rectangle is: " << height * width << endl;
    else
    {
        rectanglePerimeter = height * 2 + width * 2;
        cout << "The perimeter of your rectangle is: " << rectanglePerimeter << endl;
    }
}

void triangleTower(int height, int width)
{
    int rectanglePerimeter, selected = 0;
    cout << "Enter 1 to calculate the perimeter of your triangle" << endl;
    cout << "Enter 2 to print your triangle" << endl;
    cin >> selected;
    if (selected == 1)
    {
        rectanglePerimeter = 2 * width + height;
        cout << "The perimeter of your rectangle is: " << rectanglePerimeter << endl;
    }
    else
    {
        if (width % 2 == 0 || width > 2 * height)
            cout << "Sorry but the triangle cannot be printed" << endl;
        else
        {
            printTriangle(width, height);
        }
    }
}

void printLine(int width, int starsCount)
{
    int spaceCount = width / 2 - starsCount / 2;
    for (int i = 0; i < spaceCount; i++)
        cout << "  ";

    for (int i = 0; i < starsCount; i++)
        cout << "* ";
    cout << endl << endl;
}

void printTriangle(int width, int height)
{
    int linesTypes = width / 2 - 1;
    if (linesTypes == 0 && height > 2)
        linesTypes = 1;
    int linesPerType = (height - 2) / linesTypes;
    int rest = (height - 2) % linesTypes;
    int starsCount = 1;
    int countSecondLines = linesPerType + rest;

    printLine(width, starsCount);
    starsCount += 2;

    printSecondLines(countSecondLines, width, starsCount);

    starsCount += 2;

    for (int i = 0, count = 0; i < height - 2 - countSecondLines; i++)
    {
        if (count >= linesPerType) {
            count = 0;
            starsCount += 2;
        }
        printLine(width, starsCount);
        count++;
    }
    printLine(width, width);
}

void printSecondLines(int countSecondLines, int width, int starsCount)
{
    for (int i = 0; i < countSecondLines; i++)
    {
        printLine(width, starsCount);
    }
}


int main()
{
    int height, width, selected;
    do {
        cout << "Enter 1 to select a rectangular tower" << endl;
        cout << "Enter 2 to select a triangle tower tower" << endl;
        cout << "Enter 3 to exit the program" << endl;
        cin >> selected;
        if (selected == 2 || selected == 1)
        {
            cout << "Enter the height and width of the tower" << endl;
            cin >> height >> width;
            if (selected == 1)
                rectangularTower(height, width);
            else if (selected == 2)
                triangleTower(height, width);
        }
    } while (selected != 3);
    return 0;
}