interface Project {
  projectName: string;
  member: number;
  profit: number;
}

interface Result {
  maxProfit: number;
  selectedProjects: Project[];
}

class DP {
    optimize(projects: Project[], maxMembers: number): Result {
        const n = projects.length;

        // Create a table to store the computed results
        const dp: number[][] = new Array(n + 1);
        for (let i = 0; i <= n; i++) {
            dp[i] = new Array(maxMembers + 1).fill(0);
        }

        // Create a table to store the selected projects
        const selected: boolean[][] = new Array(n + 1);
        for (let i = 0; i <= n; i++) {
            selected[i] = new Array(maxMembers + 1).fill(false);
        }

        // Build up the table iteratively
        for (let i = 1; i <= n; i++) {
            const { projectName, member, profit } = projects[i - 1];
            for (let j = 1; j <= maxMembers; j++) {
            if (member > j) {
                // If the current project's member exceeds the current capacity, skip it
                dp[i][j] = dp[i - 1][j];
            } else {
                // Consider the maximum profit by either including or excluding the current project
                const includeProfit = dp[i - 1][j - member] + profit;
                if (includeProfit > dp[i - 1][j]) {
                    dp[i][j] = includeProfit;
                    selected[i][j] = true; // Mark the project as selected
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
            }
        }

        // Retrieve the selected projects
        const selectedProjects: Project[] = [];
        let i = n;
        let j = maxMembers;
        while (i > 0 && j > 0) {
            if (selected[i][j]) {
                selectedProjects.push(projects[i - 1]);
                j -= projects[i - 1].member;
            }
            i--;
        }

        // The last cell of the table will contain the maximum profit
        return {
            maxProfit: dp[n][maxMembers],
            selectedProjects: selectedProjects.reverse(),
        };
    }
}

export default DP;